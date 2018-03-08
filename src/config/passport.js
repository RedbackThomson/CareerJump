const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const localUserOptions = {
  usernameField: 'email',
  passReqToCallback: true
};

const LOGIN_ERRORS = {
  NO_USER_FOUND: 'Incorrect Email/Password',
  ACCOUNT_DELETED: 'This account has been deleted'
};

module.exports = (models) => {
  passport.use('StudentUser',
    new LocalStrategy(localUserOptions, (req, email, password, done) => {
      let _user;
      models.StudentUser.findOne({
        where: {email: {ilike: email}}
      })
        .then(user => {
          if (!user) {
            req.authError = LOGIN_ERRORS.NO_USER_FOUND;
            return done(null, false);
          }

          if (user.deleted) {
            req.authError = LOGIN_ERRORS.ACCOUNT_DELETED;
            return done(null, false);
          }

          _user = user;
          return user.validPassword(password);
        })
        .then(valid => {
          if (!valid) {
            req.authError = LOGIN_ERRORS.NO_USER_FOUND;
            return done(null, false, {error: LOGIN_ERRORS.NO_USER_FOUND});
          }
          return done(null, _user);
        })
        .catch(done);
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    models.StudentUser.findById(id)
      .then(user => done(null, user))
      .catch(err => done(err, null));
  });
};
