const passport = require('passport');
const express = require('express');

const {studentRedirects, companyRedirects, pages} = require('./helpers');

const router = express.Router();

const studentOptions = Object.assign({
  failWithError: true
}, studentRedirects);

const companyOptions = Object.assign({
  failWithError: true
}, companyRedirects);

handleAuthentication = (req, res, next) => (err, user, info) => {
  if (err) {
    next(err);
  }

  if (info && info.error) {
    req.flash('error', info.error);
    return res.redirect(pages.LOGIN);
  }

  return req.logIn(user, function(err) {
    if (err) {
      return next(err);
    }
    return res.redirect(studentRedirects.successRedirect);
  });
};

studentAuthenticate = (req, res, next) =>
  passport.authenticate('StudentUser', studentOptions,
    handleAuthentication(req, res, next))(req, res, next);

companyAuthenticate = (req, res, next) =>
  passport.authenticate('CompanyUser', companyOptions,
    handleAuthentication(req, res, next))(req, res, next);

module.exports = () => {
  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(pages.LOGIN);
  });

  router.route('/login')
    .get((req, res) => res.render('pages/login/student'))
    .post(studentAuthenticate);

  router.route('/login/company')
    .get((req, res) => res.render('pages/login/company'))
    .post(companyAuthenticate);
  return router;
};
