const passport = require('passport');
const express = require('express');

const {redirects} = require('./helpers');

const router = express.Router();

const studentAuth = passport.authenticate('StudentUser', redirects);

module.exports = () => {
  router.get('/login', (req, res) => res.render('pages/login'));

  router.post('/login', studentAuth, (req, res) =>
    res.redirect(loginRedirects.successRedirect));
  return router;
};
