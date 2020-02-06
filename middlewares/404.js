const path = require('path');

function notFound(req, res, next) {
  const notFoundPagePath = path.resolve(__dirname, '../pages/404.html');

  res.sendFile(notFoundPagePath);
}

module.exports = {notFound};
