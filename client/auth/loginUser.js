const axios = require('axios');
const { prompt } = require('inquirer');

const loginUser = async (username, password, email = null) => {
  if (email) {
    try {
      const response = await axios.post('http://127.0.0.1:8080/auth/login', {
        username,
        password,
      });

      console.log(response.data.message);
      return response.data.token;
    }
    catch (error) { console.error(error.response.data); }
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

    console.log(response.data.message);
    return response.data.token;
  }
  catch (error) {
    if (error.response.data.message === 'Invalid username or password') {
      console.info(error.response.data.message);
      loginUser(username, password);
    }
    else console.error(error.response.data);
  }
};

module.exports = loginUser;
