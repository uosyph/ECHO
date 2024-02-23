const Channel = require('../models/channel.model');

async function createChannel(req, res) {
  try {
    const { roomName } = req.body;
    const isRoomExist = await Channel.findOne({ roomName });
    if (isRoomExist) res.status(409).json({ message: 'Channel already exists.' });
    else {
      const chatRoom = new Channel(req.body);
      const savedChatRoom = await chatRoom.save();
      res.status(200).json(savedChatRoom.roomName);
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to create channel.' });
  }
}

async function joinChannel(req, res) {
  try {
    const chatRooms = await Channel.find({}, 'roomName');
    const roomNames = chatRooms.map((chatRoom) => chatRoom.roomName);
    res.status(200).json(roomNames);
  } catch (error) {
    res.status(500).json({ message: 'Couldn\'t join channel.' });
  }
}

module.exports = {
  createChannel,
  joinChannel,
};
