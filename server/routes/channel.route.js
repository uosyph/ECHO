const express = require('express');

const { createChannel, joinChannel } = require('../controllers/channel.controller');

const channelRouter = express.Router();

channelRouter.post('/chatrooms', createChannel);
channelRouter.get('/chatrooms', joinChannel);

module.exports = channelRouter;
