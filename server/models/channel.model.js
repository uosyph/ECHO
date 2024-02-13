const mongoose = require('mongoose');

const channelSchema = new mongoose.Schema({
  roomName: {
    type: String,
    required: true,
  },
}, { timestamps: true }
);

const Channel = mongoose.model('Channel', channelSchema);

module.exports = Channel;
