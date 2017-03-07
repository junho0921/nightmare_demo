'use strict';

const path = require('path');
const Nightmare = require('nightmare');

module.exports = options => {
  let ppname;
  switch (process.platform) {
    case 'win32':
      ppname = 'pepflashplayer64_24_0_0_221.dll';
      break;
    case 'darwin':
      ppname = 'PepperFlashPlayer.plugin';
      break;
    case 'linux':
      ppname = 'libpepflashplayer.so';
      break;
  }
  let ppapi = path.join(__dirname, '../lib', ppname);
  let def = {
    show: true,
    width: 1920,
    height: 1080,
    plugin: true,
    webPreferences: {
      plugins: true
    },
    switches: {
      'ppapi-flash-path': ppapi,
    },
    openDevTools: true,
  };
  const opt = Object.assign({}, def, options);

  return Nightmare(opt);
}
