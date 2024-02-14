const jwt = require('jsonwebtoken');

const User = require('./models/user.model');

module.exports = (io) => {
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      const user = await User.findById(decodedToken.userId);
      if (!user) throw new Error('User not found');

      socket.username = user.username;
      next();
    } catch (error) {
      console.error('Authentication error', error);
      next(new Error('Authentication error'));
    }
  });


  io.on('connection', (socket) => {
    // Create a Map to track the room for each socket connection
    const socketRoomMap = new Map();

    // Handle 'join' event when a client joins the chat room
    socket.on('join', (room) => {
      socket.emit('username', socket.username);
      socket.join(room);
      socketRoomMap.set(socket.username, room);
      socket.emit('joined', `You joined ${room}`);
      socket.broadcast.to(room).emit('user joined', `${socket.username} joined ${room}`);
    });

    // Handle 'chat message' event when a client sends a message
    socket.on('chat message', (room, message) => {
      socket.broadcast.to(room).emit('chat message', `${socket.username}: ${message}`);
    });

    // Handle 'disconnect' event when a client disconnects
    socket.on('disconnecting', () => {
      const room = socketRoomMap.get(socket.username);
      if (room) {
        socket.broadcast.to(room).emit('user left', `${socket.username} left the chat room`);
        socketRoomMap.delete(socket.username);
      }
    });
  });
};
