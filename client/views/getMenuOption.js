const { prompt } = require('inquirer');

function getMenuOption() {
  const menuOptions = [
    {
      type: 'list',
      name: 'selectedOption',
      message: 'Home',
      choices: [
        { name: 'Create a Channel', value: 'Create-Chat-Room', message: 'Create a Channel' },
        { name: 'Join a Channel', value: 'Join-Chat-Room', message: 'Join a Channel' },
        { name: 'Exit', value: 'Exit', message: 'Exit the App' },
      ]
    },
  ];

  return prompt(menuOptions).then(answers => answers.selectedOption);
}

module.exports = getMenuOption;
