const express = require('express');

const authRouter = require('./routes/auth/auth.route');
const channelRouter = require('./routes/channel/channel.route');

const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/channel', channelRouter);

module.exports = app;
