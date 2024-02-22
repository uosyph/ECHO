const { prompt } = require('inquirer');

const colorize = require('../tools/colorizer');

function homeInterface() {
  const menuOptions = [
    {
      type: 'list',
      name: 'selectedOption',
      message: 'Home',
      choices: [
        { name: 'Create a channel', value: 'Create-Channel', message: 'Create a channel' },
        { name: 'Join a channel', value: 'Join-Channel', message: 'Join a channel' },
        { name: 'Exit', value: 'Exit', message: 'Exit ECHO' },
      ],
      prefix: `${colorize('\u2716', 'magenta')}`,
    },
  ];

  return prompt(menuOptions).then(answers => answers.selectedOption);
}

module.exports = homeInterface;
