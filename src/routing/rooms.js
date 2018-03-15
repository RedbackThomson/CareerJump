const express = require('express');

const {isAuthenticated, getInterview} = require('./helpers');

const router = express.Router();

module.exports = (models) => {
  router.get('/:roomName', isAuthenticated,
    getInterview(models, 'roomName'), (req, res) => {
      return res.render('pages/room', {interview: req.interview});
    });

  return router;
};
