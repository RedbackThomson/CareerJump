require('dotenv').config();

const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const throng = require('throng');
const compression = require('compression');
const passport = require('passport');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const models = require('./models');
const logger = require('./config/logging');

var WORKERS = process.env.WEB_CONCURRENCY || 1;

function startInstance() {
  models.sequelize
    .authenticate()
    .then(() => {
      var app = express();
      var port = process.env.PORT || 3000;
      app.listen(port);

      app.use(compression());

      app.use(express.static('public'));

      app.use(bodyParser.json({type: 'application/json', limit: '50mb'}));
      app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb',
        parameterLimit: 3000
      }));
      app.use(cookieParser(process.env.COOKIE_SECRET));
      app.use(session({
        store: new RedisStore({
          url: process.env.REDIS_URL
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false
      }));

      app.use(passport.initialize());
      app.use(passport.session());
      require('./config/passport')(models);

      app.engine('pug', require('pug').__express);
      app.set('view engine', 'pug');
      app.set('views', path.join(__dirname, '../views'));

      app.use(require('./routing')(models));

      http.createServer(app).listen(app.get(port), function(){
        logger.log('info',
          'Server started. Listening on port %s with %s worker(s)',
          port, WORKERS);
      });
    })
    .catch(console.error);
};

if (process.env.NODE_ENV === 'development') {
  // Don't multithread for debugging ease
  startInstance();
} else {
  throng({
    workers: WORKERS,
    lifetime: Infinity
  }, startInstance);
}
