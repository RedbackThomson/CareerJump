const express = require('express');

const router = express.Router();

module.exports = (models) => {
  router.use('/rooms', require('./rooms')(models));
  router.use('/profile', require('./profile')(models));

  return router;
};
