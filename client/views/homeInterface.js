const { prompt } = require('inquirer');

function homeInterface() {
  const menuOptions = [
    {
      type: 'list',
      name: 'selectedOption',
      message: 'Home',
      choices: [
        { name: 'Create a Channel', value: 'Create-Channel', message: 'Create a Channel' },
        { name: 'Join a Channel', value: 'Join-Channel', message: 'Join a Channel' },
        { name: 'Exit', value: 'Exit', message: 'Exit the App' },
      ]
    },
  ];

  return prompt(menuOptions).then(answers => answers.selectedOption);
}

module.exports = homeInterface;
