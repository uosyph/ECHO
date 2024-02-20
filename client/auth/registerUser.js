const axios = require('axios');
const { prompt } = require('inquirer');

const loginUser = require('./loginUser');

const registerUser = async () => {
  const questions = [
    {
      type: 'input',
      name: 'username',
      message: 'Enter your username:',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Enter your email:',
    },
    {
      type: 'password',
      name: 'password',
      message: 'Enter your password:',
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

    console.info(response.data.message);
    return loginUser(username, password, email);
  } catch (error) {
    console.error(error.response.data.message);
  }
};

module.exports = registerUser;
