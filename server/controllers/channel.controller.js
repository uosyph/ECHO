const ChatRoom = require("../models/channel.model");

async function createChannel(req, res) {
  try {
    const { channelName } = req.body;
    const isChannelExist = await ChatRoom.findOne({ channelName });
    if (isChannelExist) {
      res.status(409).json({ message: 'Chat room already exists' });
    } else {
      const chatRoom = new ChatRoom(req.body);
      const savedChatRoom = await chatRoom.save();
      res.status(201).json(savedChatRoom.roomName);
    }
  } catch (err) {
    res.status(500).json({ message: 'Chat room creation failed' });
  }
}

async function joinChannel(req, res) {
  try {
    const channels = await ChatRoom.find({}, 'roomName');
    const channelNames = channels.map((chatRoom) => chatRoom.roomName);
    res.status(200).json(channelNames);
  } catch (err) {
    res.status(500).json({ message: 'couldn\'t join chat room' });
  }
}

module.exports = {
  createChannel,
  joinChannel,
};
