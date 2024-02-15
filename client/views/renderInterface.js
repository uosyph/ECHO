const registerUser = require('../auth/registerUser');
const loginUser = require('../auth/loginUser');
const createChannel = require('../ui/createChannel');
const joinChannel = require('../ui/joinChannel');
const exitApp = require('../ui/exitApp');

const render = {
  'Register': registerUser,
  'Login': loginUser,
  'Create-Chat-Room': createChannel,
  'Join-Chat-Room': joinChannel,
  'Exit': exitApp
};

module.exports = render;
