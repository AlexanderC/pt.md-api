const jwt = require('jsonwebtoken');
const debug = require('./helper/debug')(__filename);
const { mask } = require('./helper/string');

module.exports = (req, res) => {
  const { username, password } = req.body || {};

  debug(
    'Request JWT Token',
    `username=${ mask(username) }`,
    `password=${ mask(password) }`,
  );

  res.send(JSON.stringify({
    token: jwt.sign({ username, password }, process.env.JWT_SECRET),
  }));
};
