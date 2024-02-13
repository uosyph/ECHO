const express = require('express');

const { createChatRoom, joinChatRoom } = require('../controllers/channel.controller');

const chatRoomRouter = express.Router();

chatRoomRouter.post('/chatrooms', createChatRoom);
chatRoomRouter.get('/chatrooms', joinChatRoom);

module.exports = chatRoomRouter;
