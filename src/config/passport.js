const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const localUserOptions = {
  usernameField: 'email'
};

const LOGIN_ERRORS = {
  NO_USER_FOUND: 'Incorrect Email/Password',
  ACCOUNT_DELETED: 'This account has been deleted'
};

module.exports = (models) => {
  passport.use('StudentUser',
    new LocalStrategy(localUserOptions, (email, password, done) => {
      let _user;
      models.StudentUser.findOne({
        where: {email: {ilike: email}}
      })
        .then(user => {
          if (!user) {
            return done(LOGIN_ERRORS.NO_USER_FOUND, null);
          }

          if (user.deleted) {
            return done(LOGIN_ERRORS.ACCOUNT_DELETED, null);
          }

          _user = user;
          return user.validPassword(password);
        })
        .then(valid => {
          if (!valid) {
            return done(null, false);
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
