import "reflect-metadata";

import {useExpressServer} from "routing-controllers";
import * as express from "express";
import * as moment from "moment";
import { AuthRouter } from "./AuthRouter";
import { AuthManager } from "../managers/AuthManager";

export class Router {
  public static initializeRoutes(app: express.Express) {
    app.locals.moment = moment;
    app.use((req, res, next) => { 
      res.locals.user = req.user; 
      next(); 
    });
     
    useExpressServer(app, {
      controllers: [__dirname + "/controllers/**/*.js"],
      authorizationChecker: AuthManager.authorised,
      currentUserChecker: AuthManager.currentUser
    });
    app.use('/', new AuthRouter().router);

  }
}