const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = function (req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).send('Access denied.');

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send('Invalid token.');
  }
};
