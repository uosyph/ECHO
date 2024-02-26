#!/usr/bin/env node
const { Command } = require('commander');
const ioSocket = require('socket.io-client');
const LocalStorage = require('node-localstorage').LocalStorage;

const authInterface = require('./views/authInterface');
const homeInterface = require('./views/homeInterface');
const channelInterface = require('./views/channelInterface');
const render = require('./views/renderInterface');
const eventHandler = require('./eventHandler');
const exitClient = require('./ui/exitClient');
const colorize = require('./tools/colorizer');

const echo = new Command();

echo
  .version('1.3.0')
  .description('A modern and lightweight TUI chat app designed for seamless communication in a command-line environment.');

echo.action(async () => {
  // Check if user if logged in and if not Render authentication interface
  const localStorage = new LocalStorage('./');
  const storedToken = localStorage.getItem('token');

  let token;
  if (storedToken) token = storedToken;
  else {
    const authOption = await authInterface();
    token = await render[authOption]();
  }

  if (!token) {
    console.error(colorize('Authentication Error!', 'brightWhite', 'red'));
    process.exit(1);
  }

  const client = ioSocket('https://echo-rrur.onrender.com', { auth: { token } });
  eventHandler(client);

  // Render menu interface according to what the user selects
  const homeOption = await homeInterface();

  let channel = undefined;
  if (homeOption === 'Create-Channel') {
    while (channel === undefined) channel = await render[homeOption](client);
  }
  else channel = await render[homeOption](client);

  channelInterface(client, channel);
});

echo.parse(process.argv);

process.on('SIGINT', () => {
  console.log('');
  exitClient();
});

process.on('uncaughtException', (error) => {
  console.error(colorize('Uncaught client exception:', 'brightWhite', 'red'), error);
  process.exit(1);
});
