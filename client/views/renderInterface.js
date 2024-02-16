const registerUser = require('../auth/registerUser');
const loginUser = require('../auth/loginUser');
const createChannel = require('../ui/createChannel');
const joinChannel = require('../ui/joinChannel');
const exitClient = require('../ui/exitClient');

const render = {
  'Register': registerUser,
  'Login': loginUser,
  'Create-Chat-Room': createChannel,
  'Join-Chat-Room': joinChannel,
  'Exit': exitClient
};

module.exports = render;
