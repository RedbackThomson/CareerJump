require('dotenv').config();

const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
const throng = require('throng');
const compression = require('compression');
const passport = require('passport');
const session = require('express-session');
const moment = require('moment');
const RedisStore = require('connect-redis')(session);

const logger = require('./config/logging');

var WORKERS = process.env.WEB_CONCURRENCY || 1;

function loadModels() {
  var models = require('./models');
  models.sequelize
    .authenticate()
    .then(() => startInstance(models))
    .catch(console.error);
};

function startInstance(models) {
  var app = express();
  var port = process.env.PORT || 3000;
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
  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());
  require('./config/passport')(models);

  app.engine('pug', require('pug').__express);
  app.set('view engine', 'pug');
  app.set('views', path.join(__dirname, '../views'));

  // User injection
  app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
  });
  // Routing Strategies
  app.use(require('./routing/strategies')(models));
  app.locals.moment = moment;
  app.locals.env = app.settings.env;
  app.use(require('./routing')(models));

  var server = app.listen(port, function() {
    logger.log('info',
      'Server started. Listening on port %s with %s worker(s)',
      port, WORKERS);
  });

  return server;
}

if (process.env.NODE_ENV === 'development') {
  // Don't multithread for debugging ease
  loadModels();
} else if (process.env.NODE_ENV === 'test') {
  // Don't start the server, just export
  module.exports = startInstance;
} else {
  throng({
    workers: WORKERS,
    lifetime: Infinity
  }, loadModels);
}
