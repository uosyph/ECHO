const axios = require('axios');
const { prompt } = require('inquirer');

const loginUser = require('./loginUser');
const colorize = require("../tools/colorizer");

const registerUser = async () => {
  const questions = [
    {
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
      prefix: `${colorize('\u00D7', 'magenta', null, 'bold')}`,
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email:',
      prefix: `${colorize('\u00D7', 'magenta', null, 'bold')}`,
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password:',
      prefix: `${colorize('\u00D7', 'magenta', null, 'bold')}`,
    },
  ];

  try {
    const answers = await prompt(questions);
    const { username, email, password } = answers;
    const response = await axios.post('http://127.0.0.1:8080/auth/register', {
      username,
      email,
      password,
    });

    console.log(colorize(response.data.message, 'brightWhite'));
    return loginUser(username, password, email);
  } catch (error) {
    console.error(colorize(error.response.data.message, 'red'));
  }
};

module.exports = registerUser;
