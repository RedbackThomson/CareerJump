require('dotenv').config();

const path = require('path');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');
const throng = require('throng');

const database = require('./models');
const logger = require('./config/logging');

var WORKERS = process.env.WEB_CONCURRENCY || 1;

function startInstance() {
  database.sequelize
    .authenticate()
    .then(() => {
      var app = express();
      var port = process.env.PORT || 3000;
      app.listen(port);

      app.use(bodyParser.json({type: 'application/json', limit: '50mb'}));
      app.use(bodyParser.urlencoded({
        extended: true,
        limit: '50mb',
        parameterLimit: 3000
      }));

      app.engine('pug', require('pug').__express);
      app.use(express.static('public'));
      app.set('views', path.join(__dirname, '../views'));

      require('./config/routes')(app, database);

      http.createServer(app).listen(app.get(port), function(){
        logger.log('info',
          'Server started. Listening on port %s with %s worker(s)',
          port, WORKERS);
      });
    })
    .catch(logger.error);
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
