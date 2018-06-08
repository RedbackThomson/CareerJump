import "reflect-metadata";

import {useExpressServer} from "routing-controllers";
import * as express from "express";
import * as moment from "moment";

export class Router {
  public static initializeRoutes(app: express.Express) {
    useExpressServer(app, {
        controllers: [__dirname + "/**/*.js"]
    });

    app.locals.moment = moment;
  }
}