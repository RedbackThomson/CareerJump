const express = require('express');

const {isAuthenticated} = require('./helpers');

const router = express.Router();

module.exports = (models) => {
  router.use('/auth', require('./auth')());
  router.use('/rooms', require('./rooms')(models));

  router.use('/api', require('./api')(models));

  router.get('/login', (req, res) => res.redirect('/auth/login'));
  router.get('/logout', (req, res) => res.redirect('/auth/logout'));
  router.get('/dashboard', isAuthenticated,
    (req, res) => res.render('pages/dashboard'));

  router.get('/', (req, res) => res.render('index'));
  return router;
};
