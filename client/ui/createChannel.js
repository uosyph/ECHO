const axios = require('axios');
const { prompt } = require('inquirer');

const joinChannel = require('./joinChannel');

module.exports = async function createChatRoom(client) {
  const question = [
    {
      type: 'input',
      name: 'roomName',
      message: 'Enter channel name:'
    }
  ];

  try {
    const answer = await prompt(question);
    const roomName = answer.roomName;
    const response = await axios.post('http://127.0.0.1:8080/channel/chatrooms', { roomName });
    const channel = response.data;

    console.info(`${channel} was just created.`);
    joinChannel(client, channel);
    return channel;
  } catch (error) {
    if (error.response.data.message) {
      console.error(error.response.data.message);
      createChatRoom(client);
    }
    else console.error(error);
  }
};
