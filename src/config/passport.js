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
            return done(req.authError);
          }

          if (user.deleted) {
            req.authError = LOGIN_ERRORS.ACCOUNT_DELETED;
            return done(req.authError);
          }

          _user = user;
          return user.validPassword(password);
        })
        .then(valid => {
          if (!valid) {
            req.authError = LOGIN_ERRORS.NO_USER_FOUND;
            return done(req.authError);
          }

          return done(null, _user);
        })
        .catch(done);
    })
  );

  passport.use('CompanyUser',
    new LocalStrategy(localUserOptions, (req, email, password, done) => {
      let _user;
      models.CompanyUser.findOne({
        where: {email: {ilike: email}}
      })
        .then(user => {
          if (!user) {
            req.authError = LOGIN_ERRORS.NO_USER_FOUND;
            return done(req.authError);
          }

          if (user.deleted) {
            req.authError = LOGIN_ERRORS.ACCOUNT_DELETED;
            return done(req.authError);
          }

          _user = user;
          return user.validPassword(password);
        })
        .then(valid => {
          if (!valid) {
            req.authError = LOGIN_ERRORS.NO_USER_FOUND;
            return done(req.authError);
          }

          return done(null, _user);
        })
        .catch(done);
    })
  );

  passport.serializeUser((user, done) =>
    done(null, {
      id: user.id,
      isCompany: user.dataValues.companyId !== undefined
    })
  );

  passport.deserializeUser((user, done) => {
    const isCompany = user.isCompany;

    if (isCompany) {
      return models.CompanyUser.findOne({
        where: {id: user.id},
        include: [{
          model: models.Company,
          as: 'company'
        }]
      })
        .then(user => {
          user.isCompany = true;
          user.isStudent = false;
          return done(null, user);
        })
        .catch(err => done(err, null));
    }

    return models.StudentUser.findOne({
      where: {id: user.id},
      include: [{
        model: models.StudentProfile,
        as: 'profile'
      }]
    })
      .then(user => {
        user.isCompany = false;
        user.isStudent = true;
        return done(null, user);
      })
      .catch(err => done(err, null));
  });
};
