const express = require('express');

const router = express.Router();

const {isAuthenticated} = require('./helpers');

module.exports = (models) => {
  router.use('/auth', require('./auth')());
  router.use('/rooms', require('./rooms')(models));

  router.use('/api', require('./api')(models));

  router.get('/login', (req, res) => res.redirect('/auth/login'));
  router.get('/logout', (req, res) => res.redirect('/auth/logout'));

  router.get('/dashboard', isAuthenticated,
    (req, res, next) => req.routeStrategy.dashboard(req, res, next));

  router.get('/support', isAuthenticated,
    (req, res) => res.render('pages/support'));

  router.get('/profile', isAuthenticated,
    (req, res, next) =>
      models.Skillset.findAll()
        .then(skillsets => res.render('pages/profile',
          {user: req.user, skillsets}))
        .catch(next)
  );

  router.get('/', (req, res) => res.render('index'));
  return router;
};
