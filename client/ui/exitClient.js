const colorize = require('../tools/colorizer');

module.exports = () => {
  console.info(`${colorize('Ended', 'brightWhite')} ${colorize('ECHO', 'magenta')}${colorize('\u2026', 'brightWhite')}`);
  process.exit(0);
};
