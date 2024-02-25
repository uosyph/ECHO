const axios = require('axios');
const { prompt } = require('inquirer');

const joinChannel = require('./joinChannel');
const colorize = require('../tools/colorizer');

module.exports = async function createChannel(client) {
  const question = [
    {
      type: 'input',
      name: 'roomName',
      message: 'Enter channel name:',
      prefix: `${colorize('\u00D7', 'magenta', null, 'bold')}`,
    }
  ];

  try {
    const answer = await prompt(question);
    const roomName = answer.roomName;
    const response = await axios.post('https://echo-rrur.onrender.com/channel/chatrooms', { roomName });
    const channel = response.data;

    console.info(colorize(channel, 'magenta', null, 'bold') + colorize(' was just created.', 'brightWhite'));
    joinChannel(client, channel);
    return channel;
  } catch (error) {
    if (error.response.data.message) {
      console.error(colorize(error.response.data.message, 'red'));
    }
    else console.error(error);
  }
};
