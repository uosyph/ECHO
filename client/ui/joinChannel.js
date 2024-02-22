const axios = require('axios');
const { prompt } = require('inquirer');

const colorize = require('../tools/colorizer');

module.exports = async function joinChatRoom(client, channel = null) {
  if (channel) client.emit('join', channel);
  else {
    const response = await axios.get('http://127.0.0.1:8080/channel/chatrooms');
    const channels = response.data;
    const channelsOption = [
      {
        type: 'list',
        name: 'selectedRoom',
        message: 'Choose a channel to join:',
        choices: channels,
        prefix: `${colorize('\u2716', 'magenta')}`,
      },
    ];
    const { selectedRoom } = await prompt(channelsOption);
    client.emit('join', selectedRoom);
    return selectedRoom;
  }
};
