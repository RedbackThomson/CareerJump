import * as passport from 'passport';
import { Action } from 'routing-controllers';
import { CompanyUser, StudentUser } from '../models';

export enum AUTH_TYPES {
  STUDENT = "student",
  COMPANY = "company"
};

export class AuthManager {
  private static pages = {
    HOME_PAGE: '/',
    LOGIN: '/auth/login',
    COMPANY_LOGIN: '/auth/login/company',
    LOGOUT: '/auth/logout',
    DASHBOARD: '/dashboard'
  };
  
  private static redirects = {
    loginRedirect: AuthManager.pages.LOGIN,
    failureRedirect: AuthManager.pages.LOGIN,
    successRedirect: AuthManager.pages.DASHBOARD
  };
  
  private static companyRedirects = {
    loginRedirect: AuthManager.pages.COMPANY_LOGIN,
    failureRedirect: AuthManager.pages.COMPANY_LOGIN,
    successRedirect: AuthManager.pages.DASHBOARD
  };

  private static studentOptions = Object.assign({
    failWithError: true
  }, AuthManager.redirects);
  
  private static companyOptions = Object.assign({
    failWithError: true
  }, AuthManager.companyRedirects);

  static studentAuthenticate = (callback: Function) =>
    passport.authenticate('StudentUser', AuthManager.studentOptions,
      callback);

  static companyAuthenticate = (callback: Function) =>
    passport.authenticate('CompanyUser', AuthManager.companyOptions,
      callback);

  static authorised = (action: Action, types: AUTH_TYPES[]) => {
    if (!action.request.isAuthenticated()) {
      return false;
    }

    if(types.length === 0) {
      return true;
    }

    let {user} = action.request;

    if (types.indexOf(AUTH_TYPES.COMPANY) !== -1 && user instanceof CompanyUser) {
      return true;
    }
    if (types.indexOf(AUTH_TYPES.STUDENT) !== -1 && user instanceof StudentUser) {
      return true;
    }
    return false;
  };

  static currentUser = (action: Action) => {
    return action.request.user;
  }
}