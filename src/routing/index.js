const express = require('express');

const router = express.Router();

const {isAuthenticated} = require('./helpers');

module.exports = (models) => {
  router.use('/auth', require('./auth')());
  router.use('/api', require('./api')(models));

  /** Shared Routes */
  router.get('/logout', (req, res) => res.redirect('/auth/logout'));

  router.use('/rooms/:roomName', isAuthenticated,
    (req, res, next) => req.routeStrategy.room(req, res, next));

  router.get('/dashboard', isAuthenticated,
    (req, res, next) => req.routeStrategy.dashboard(req, res, next));

  router.get('/support', isAuthenticated,
    (req, res, next) => req.routeStrategy.support(req, res, next));

  router.get('/profile', isAuthenticated,
    (req, res, next) => req.routeStrategy.profile(req, res, next));

  /** Student-Specific Routes */
  router.get('/login', (req, res) => res.redirect('/auth/login'));

  /** Company Specific Routes */
  router.get('/login/company', (req, res) =>
    res.redirect('/auth/login/company'));

  router.get('/company', (req, res) =>
    res.render('pages/company-profile/company'));

  router.get('/billing', (req, res) =>
    res.render('pages/billing/company'));

  router.get('/', (req, res) => res.render('index'));
  return router;
};
