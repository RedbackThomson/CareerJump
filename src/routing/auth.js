const passport = require('passport');
const express = require('express');

const {redirects, pages} = require('./helpers');

const router = express.Router();

const studentOptions = Object.assign({
  failWithError: true
}, redirects);

module.exports = () => {
  router.post('/login', (req, res, next) =>
    passport.authenticate('StudentUser', studentOptions,
      (err, user, info) => {
        if (err) {
          return next(err);
        }
        if (info && info.error) {
          return res.redirect(pages.LOGIN, {error: info.error});
        }

        return req.logIn(user, function(err) {
          if (err) {
            return next(err);
          }
          return res.redirect(redirects.successRedirect);
        });
      })(req, res, next)
  );

  router.get('/logout', (req, res) => {
    req.logout();
    res.redirect(pages.LOGIN);
  });

  router.get('/login', (req, res) => res.render('pages/login'));
  return router;
};
