const express = require('express');

const router = express.Router();

module.exports = (models) => {
  router.get('/:roomName', (req, res) => {
    return res.render('pages/room', {
      title: req.params.roomName,
      roomName: req.params.roomName
    });
  });

  return router;
};
