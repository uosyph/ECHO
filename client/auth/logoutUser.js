const LocalStorage = require('node-localstorage').LocalStorage;

const exitClient = require('../ui/exitClient');
const colorize = require('../tools/colorizer');

const logoutUser = async () => {
  const localStorage = new LocalStorage('./');

  localStorage.removeItem('token');
  console.log(colorize('User logged out successfully!', 'brightWhite'));

  exitClient();
};

module.exports = logoutUser;
