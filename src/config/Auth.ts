import * as passport from "passport";
import * as LocalStrategy from "passport-local";
import {StudentUser} from '../models/entities/StudentUser';
import {StudentProfile} from '../models/entities/StudentProfile';
import {Company} from '../models/entities/Company';
import {CompanyUser} from '../models/entities/CompanyUser';

const localUserOptions = {
  usernameField: 'email',
  passReqToCallback: true
};

const LOGIN_ERRORS = {
  NO_USER_FOUND: 'Incorrect Email/Password',
  ACCOUNT_DELETED: 'This account has been deleted'
};

class SerialisedUser {
  id: number;
  isCompany: boolean;
}

export class Auth {
  static serializeUser() {
    passport.serializeUser((user: StudentUser|CompanyUser, done: Function) =>
      done(null, {
        id: user.id,
        isCompany: user instanceof CompanyUser
      })
    );

    passport.deserializeUser((user: SerialisedUser, done: Function) => {
      const isCompany = user.isCompany;

      if (isCompany) {
        return CompanyUser.findOne({
          where: {id: user.id},
          include: [{
            model: Company,
            as: 'company'
          }]
        })
          .then(user => {
            return done(null, user);
          })
          .catch(err => done(err, null));
      }

      return StudentUser.findOne({
        where: {id: user.id},
        include: [{
          model: StudentProfile,
          as: 'profile'
        }]
      })
        .then(user => {
          return done(null, user);
        })
        .catch(err => done(err, null));
    });
  }

  static useStudentStrategy() {
    passport.use('StudentUser',
      new LocalStrategy(localUserOptions, (req, email, password, done) => {
        let _user;
        StudentUser.findOne({
          where: {email: {ilike: email}}
        })
          .then((user: StudentUser) => {
            if (!user) {
              req.authError = LOGIN_ERRORS.NO_USER_FOUND;
              throw req.authError;
            }

            if (user.deleted) {
              req.authError = LOGIN_ERRORS.ACCOUNT_DELETED;
              throw req.authError;
            }

            _user = user;
            return user.validPassword(password);
          })
          .then(valid => {
            if (!valid) {
              req.authError = LOGIN_ERRORS.NO_USER_FOUND;
              throw req.authError;
            }

            return done(null, _user);
          })
          .catch((err) => {
            return done(err);
          });
      })
    );
  }

  static useCompanyStrategy() {
    passport.use('CompanyUser',
    new LocalStrategy(localUserOptions, (req, email, password, done) => {
      let _user;
      CompanyUser.findOne({
        where: {email: {ilike: email}}
      })
        .then((user: CompanyUser) => {
          if (!user) {
            req.authError = LOGIN_ERRORS.NO_USER_FOUND;
            throw req.authError;
          }

          _user = user;
          return user.validPassword(password);
        })
        .then(valid => {
          if (!valid) {
            req.authError = LOGIN_ERRORS.NO_USER_FOUND;
            throw req.authError;
          }

          return done(null, _user);
        })
        .catch(done);
    })
  );
  }
}