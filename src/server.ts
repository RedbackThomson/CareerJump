import * as express from "express";
import * as compression from "compression";
import * as bodyParser from "body-parser";
import * as passport from "passport";
import * as http from "http";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as flash from "express-flash";
import * as session from "express-session";
import * as redisStore from "connect-redis";

import {Models} from './models';
import {Router} from './routing';
import {logger} from './config/logging';
import {Auth} from './config/Auth';
import * as dbConfig from '../db/config';

const RedisStore = redisStore(session);

export class Server {
  public static app: express.Express;

  constructor() {};

  public static async initialiseApp(): Promise<http.Server> {
    try {
      require('dotenv').config();

      Server.app = express();

      Server.configureApp();

      Server.initialiseAuth();

      Router.initializeRoutes(Server.app);

      try {
        await Server.initialiseDatabase();
      } catch(error) {
        logger.error("Failed to initialise database", error);
        throw error;
      }

      const port: number = Server.app.get('port');
      return Server.app.listen(port, () => {
        logger.log('info', ("Server is running on port %d in %s mode"), Server.app.get("port"), Server.app.get("env"));
      });
    } catch(error) {
      logger.error(error);
      return null;
    }
  }

  private static initialiseDatabase() {
    const nodeEnv = process.env.NODE_ENV;
    if(nodeEnv) {
        const models = new Models(dbConfig[nodeEnv]);
        return models.initModels();
    } else {
        throw new Error("No NODE ENV set");
    }
  }

  private static initialiseAuth() {
    Server.app.use(passport.initialize());
    Server.app.use(passport.session());
    Auth.serializeUser();
    Auth.useStudentStrategy();
    Auth.useCompanyStrategy();
  }

  private static configureApp() {
    Server.app.set('port', process.env.PORT || 3000);
    Server.app.use(express.static('public'));

    Server.app.use(compression());
    Server.app.use(bodyParser.json({type: 'application/json', limit: '50mb'}));
    Server.app.use(bodyParser.urlencoded({
      extended: true,
      limit: '50mb',
      parameterLimit: 3000
    }));
    Server.app.use(cookieParser(process.env.COOKIE_SECRET));
    Server.app.use(session({
      store: new RedisStore({
        url: process.env.REDIS_URL
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
    }));
    Server.app.use(flash());

    Server.app.engine('pug', require('pug').__express);
    Server.app.set('view engine', 'pug');
    Server.app.set('views', path.join(__dirname, '../views'));
  }
}