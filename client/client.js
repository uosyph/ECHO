#!/usr/bin/env node
const { Command } = require('commander');
const ioSocket = require('socket.io-client');

const authInterface = require('./views/authInterface');
const homeInterface = require('./views/homeInterface');
const channelInterface = require('./views/channelInterface');
const render = require('./views/renderInterface');
const eventHandler = require('./eventHandler');
const exitClient = require('./ui/exitClient');
const colorize = require("./tools/colorizer");

const echo = new Command();

echo.version('1.0.2').description('TUI Chat App');

echo.action(async () => {
  // Render authentication interface according to what the user selects
  const authOption = await authInterface();
  const token = await render[authOption]();

  if (!token) {
    console.error(colorize('Authentication Error!', 'brightWhite', 'red'));
    process.exit(1);
  }

  const client = ioSocket('http://127.0.0.1:8080', { auth: { token } });
  eventHandler(client);

  // Render menu interface according to what the user selects
  const homeOption = await homeInterface();
  const channel = await render[homeOption](client);

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
