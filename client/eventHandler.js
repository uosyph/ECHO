module.exports = (client) => {
  client.on('connect', () => { });
  client.on('chat message', (message) => { console.info(message); });
  client.on('joined', (info) => { console.info(info); });
  client.on('user joined', (info) => { console.info(info); });
  client.on('user left', (info) => { console.info(info); });
};
