import * as express from "express";
import {AuthManager} from "../managers/AuthManager";

export class AuthRouter {
  public router: express.Router;

  constructor() {
    this.router = express.Router();
    this.buildRoutes();
  }

  logout(req: express.Request, res: express.Response) {
    req.logout();
    res.redirect('/login');
  }

  loginPage(req: express.Request, res: express.Response) {
    // Check for authenticated
    if(req.user) {
      return res.redirect('/dashboard');
    }

    return res.render('pages/login')
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
        return res.render('pages/login');
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