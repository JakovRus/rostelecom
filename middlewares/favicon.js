const favicon = require('serve-favicon');
const path = require('path');

module.exports = {
  favicon: favicon(path.resolve(__dirname, '../public/favicon.ico')),
};