const axios = require('axios');
const { prompt } = require('inquirer');

const colorize = require("../../server/tools/colorizer");

const loginUser = async (username, password, email = null) => {
  if (email) {
    try {
      const response = await axios.post('http://127.0.0.1:8080/auth/login', {
        username,
        password,
      });

      console.log(colorize(response.data.message, 'brightWhite'));
      return response.data.token;
    }
    catch (error) { console.error(colorize(error.response.data, 'red')); }
  }

  const questions = [
    {
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password:',
    },
  ];

  try {
    const answers = await prompt(questions);
    const { username, password } = answers;
    const response = await axios.post('http://127.0.0.1:8080/auth/login', {
      username,
      password,
    });

    console.log(colorize(response.data.message, 'brightWhite'));
    return response.data.token;
  }
  catch (error) {
    console.error(colorize(error.response.data.message, 'red'));
  }
};

module.exports = loginUser;
