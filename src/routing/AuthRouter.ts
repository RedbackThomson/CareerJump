import * as express from "express";
import * as passport from "passport";
import {AuthManager} from "../managers/AuthManager";
import {Controller, Param, Body, Get, Post, Req, Res} from "routing-controllers";

export class AuthRouter {
  public router: express.Router;
  private authManager: AuthManager;

  constructor() {
    this.authManager = new AuthManager();
    this.router = express.Router();
    this.buildRoutes();
  }

  logout(req: express.Request, res: express.Response) {
    req.logout();
    res.redirect('/login');
  }

  loginPage(req: express.Request, res: express.Response) {
    return res.render('pages/login/student')
  }

  studentLoginPost(req: express.Request, res: express.Response, next: express.NextFunction) {
    AuthManager.studentAuthenticate((err, user) => {
      if(err) {
        return next();
      }
      req.login(user, () => {
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  }

  companyLoginPost(req: express.Request, res: express.Response, next: express.NextFunction) {
    AuthManager.companyAuthenticate((err, user) => {
      if(err) {
        req.flash('error', err);
        return res.render('pages/login/student');
      }
      req.login(user, () => {
        return res.redirect('/dashboard');
      });
    })(req, res, next);
  }

  private buildRoutes() {
    this.router.get('/login', this.loginPage);
    this.router.post('/login', this.studentLoginPost, this.companyLoginPost);
    this.router.get('/logout', this.logout);
  }
}