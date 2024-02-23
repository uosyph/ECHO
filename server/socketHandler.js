const jwt = require('jsonwebtoken');

const User = require('./models/user.model');
const Message = require('./models/message.model');
const colorize = require('./tools/colorizer');

module.exports = (io) => {
  // Authentication middleware
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      const user = await User.findById(decodedToken.userId);
      if (!user) throw new Error('User not found.');

      socket.username = user.username;
      next();
    } catch (error) {
      console.error('Authentication error:', error);
      next(new Error('An error occurred while attempting to authenticate user.'));
    }
  });


  io.on('connection', (socket) => {
    // Create a Map to track the room for each socket connection
    const socketRoomMap = new Map();

    // Handle 'join' event when a client joins the chat room
    socket.on('join', async (room) => {
      socket.emit('username', socket.username);
      socket.join(room);
      socketRoomMap.set(socket.username, room);

      const messages = await Message.find({ roomId: room }).sort({ createdAt: 1 });
      messages.forEach((message) => {
        socket.emit('chat message',
          socket.username === message.username ? message.message : `${colorize(message.username, 'brightWhite', null, 'bold')}: ${message.message}`
        );
      });

      socket.emit('joined',
        `You joined ${colorize(room, 'magenta')}` +
        `\n${colorize('/h', 'green')} to go Home.` +
        `\n${colorize('/e', 'brightRed')} to Exit.`
      );
      socket.broadcast.to(room).emit('user joined',
        `${colorize(socket.username, 'brightWhite')} joined ${colorize(room, 'magenta')}`
      );
    });

    // Handle 'chat message' event when a client sends a message
    socket.on('chat message', async (room, message) => {
      const newMessage = new Message({
        roomId: room,
        username: socket.username,
        message,
      });
      await newMessage.save();
      socket.broadcast.to(room).emit('chat message',
        `${colorize(socket.username, 'brightWhite', null, 'bold')}: ${message}`
      );
    });

    // Handle 'disconnect' event when a client disconnects
    socket.on('disconnecting', () => {
      const room = socketRoomMap.get(socket.username);
      if (room) {
        socket.broadcast.to(room).emit('user left',
          `${colorize(socket.username, 'brightWhite')} left ${colorize(room, 'magenta')}`
        );
        socketRoomMap.delete(socket.username);
      }
    });
  });
};
