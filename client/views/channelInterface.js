const ioSocket = require('socket.io-client');
const readline = require('readline');

const eventHandler = require('../eventHandler');
const render = require('./renderInterface');
const getToken = require('../auth/getToken');
const homeInterface = require('./homeInterface');
const exitClient = require('../ui/exitClient');

function channelInterface(client, channel) {
  console.info('/h to go Home.');
  console.info('/e to Exit.');

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let clientUsername;
  client.on('username', (username) => { clientUsername = username; });

  rl.on('line', async (input) => {
    const message = input.trim();
    if (message === '/e') {
      rl.close();
      exitClient();
    }
    else if (message === '/h') {
      if (!clientUsername) {
        console.log('Waiting for username...');
        return;
      }

      const token = await getToken(clientUsername);

      client.disconnect();

      // Create a new client connection and handle its events
      const newClient = ioSocket('http://127.0.0.1:8080', { auth: { token } });
      eventHandler(newClient);

      // Render menu interface according to user's selection and join a new channel
      const homeOption = await homeInterface();
      const channel = await render[homeOption](newClient);
      channelInterface(newClient, channel);
    }

    client.emit('chat message', channel, message);
  });
}

module.exports = channelInterface;
