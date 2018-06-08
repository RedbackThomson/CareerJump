import "reflect-metadata";

import {useExpressServer} from "routing-controllers";
import * as express from "express";
import * as moment from "moment";
import { AuthRouter } from "./AuthRouter";
import { AuthManager } from "../managers/AuthManager";

export class Router {
  public static initializeRoutes(app: express.Express) {
    useExpressServer(app, {
      controllers: [__dirname + "/controllers/**/*.js"],
      authorizationChecker: AuthManager.authorised
    });
    app.use('/', new AuthRouter().router);

    app.locals.moment = moment;
    app.use((req, res, next) => { 
      res.locals.user = req.user; 
      next(); 
    }); 
  }
}