const { info } = require('./logger');
const colors = require('colors');

const requestLogger = (req, res, next) => {
  info(colors.bgGreen(colors.green(`request-TYPE == {${req.method}}`)));
  info(colors.bgGreen(colors.green(`request-URL == {${req.url}}`)));
  next();
};

module.exports = { requestLogger };
