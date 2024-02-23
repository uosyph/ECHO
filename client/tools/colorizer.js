const styleCodes = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  italic: '\x1b[3m',
  underline: '\x1b[4m',
  inverse: '\x1b[7m',
  hidden: '\x1b[8m',
  strikethrough: '\x1b[9m',
};

const fgColorCodes = {
  black: '\x1b[30m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  brightBlack: '\x1b[90m',
  brightRed: '\x1b[91m',
  brightGreen: '\x1b[92m',
  brightYellow: '\x1b[93m',
  brightBlue: '\x1b[94m',
  brightMagenta: '\x1b[95m',
  brightCyan: '\x1b[96m',
  brightWhite: '\x1b[97m',
};

const bgColorCodes = {
  black: '\x1b[40m',
  red: '\x1b[41m',
  green: '\x1b[42m',
  yellow: '\x1b[43m',
  blue: '\x1b[44m',
  magenta: '\x1b[45m',
  cyan: '\x1b[46m',
  white: '\x1b[47m',
  brightBlack: '\x1b[100m',
  brightRed: '\x1b[101m',
  brightGreen: '\x1b[102m',
  brightYellow: '\x1b[103m',
  brightBlue: '\x1b[104m',
  brightMagenta: '\x1b[105m',
  brightCyan: '\x1b[106m',
  brightWhite: '\x1b[107m',
};

function colorize(string, fgColor, bgColor, style) {
  const fgColorCode = fgColorCodes[fgColor] || '';
  const bgColorCode = bgColorCodes[bgColor] || '';
  const styleCode = styleCodes[style] || '';
  return `${styleCode}${fgColorCode}${bgColorCode}${string}${styleCodes.reset}`;
}

module.exports = colorize;
