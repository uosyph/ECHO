const escapeCodes = {
  reset: "\x1b[0m",
  // Styles
  bold: "\x1b[1m",
  dim: "\x1b[2m",
  italic: "\x1b[3m",
  underline: "\x1b[4m",
  inverse: "\x1b[7m",
  hidden: "\x1b[8m",
  strikethrough: "\x1b[9m",
  // Foreground colors
  fgBlack: "\x1b[30m",
  fgRed: "\x1b[31m",
  fgGreen: "\x1b[32m",
  fgYellow: "\x1b[33m",
  fgBlue: "\x1b[34m",
  fgMagenta: "\x1b[35m",
  fgCyan: "\x1b[36m",
  fgWhite: "\x1b[37m",
  fgBrightBlack: "\x1b[90m",
  fgBrightRed: "\x1b[91m",
  fgBrightGreen: "\x1b[92m",
  fgBrightYellow: "\x1b[93m",
  fgBrightBlue: "\x1b[94m",
  fgBrightMagenta: "\x1b[95m",
  fgBrightCyan: "\x1b[96m",
  fgBrightWhite: "\x1b[97m",
  // Background colors
  bgBlack: "\x1b[40m",
  bgRed: "\x1b[41m",
  bgGreen: "\x1b[42m",
  bgYellow: "\x1b[43m",
  bgBlue: "\x1b[44m",
  bgMagenta: "\x1b[45m",
  bgCyan: "\x1b[46m",
  bgWhite: "\x1b[47m",
  bgBrightBlack: "\x1b[100m",
  bgBrightRed: "\x1b[101m",
  bgBrightGreen: "\x1b[102m",
  bgBrightYellow: "\x1b[103m",
  bgBrightBlue: "\x1b[104m",
  bgBrightMagenta: "\x1b[105m",
  bgBrightCyan: "\x1b[106m",
  bgBrightWhite: "\x1b[107m",
};

function colorize(text, fgColor, bgolor, style) {
  const fgColorCode = escapeCodes[fgColor] || "";
  const bgColorCode = escapeCodes[bgColor] || "";
  const styleCode = escapeCodes[style] || "";
  return `${styleCode}${fgColorCode}${bgColorCode}${text}${escapeCodes.reset}`;
}

module.exports = colorize;
