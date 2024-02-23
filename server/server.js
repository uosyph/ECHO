const http = require('http');
const ioSocket = require('socket.io');

const redisClient = require('./utils/redis');
const mongoConnect = require('./utils/mongo');
const socketHandler = require('./socketHandler');
const app = require('./app');

require('dotenv').config();
const PORT = process.env.PORT || 3000;

const server = http.createServer(app);
const io = ioSocket(server, { cors: { origin: '*' } });
socketHandler(io);

server.listen(PORT, async () => {
  await mongoConnect();
  await redisClient.connect();
  console.log(`Server listening on port ${PORT}...`);
});

process.on('uncaughtException', (error) => { console.error('Uncaught server exception:', error); });
