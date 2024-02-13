const express = require('express');

const authRouter = require('./routes/auth.route');
const chatRoomRouter = require('./routes/channel.route');

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/channel', chatRoomRouter);

module.exports = app;
