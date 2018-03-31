const chai = require('chai');
const chaiHttp = require('chai-http');
const request = require('supertest');

var should = chai.should();
chai.use(chaiHttp);

// Mock the models
const models = {};

var router = require('../../src/routing/index')(models);

process.env.NODE_ENV = 'test';

describe('Routing - Index', function() {
  var server;

  beforeEach(() => {
    server = require('../../src/server')(models);
  });

  afterEach((done) => {
    server.close(done);
  });

  it('should define the /auth subdirectory', (done) => {
    done();
  });

  it('should define the /rooms subdirectory', (done) => {
    done();
  });

  it('should define the /api subdirectory', (done) => {
    done();
  });

  it('should redirect to the login page on /login GET', (done) => {
    request(server)
      .get('/login')
      .redirects(1)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        console.log(res);
        done();
      });
  });

  it('should redirect to the logout page on /logout GET', (done) => {
    done();
  });

  it('should render the dashboard page on /dashboard GET', (done) => {
    done();
  });

  it('should ensure the user is authenticated on /dashboard GET', (done) => {
    done();
  });

  it('should render the support page on /support GET', (done) => {
    done();
  });

  it('should ensure the user is authenticated on /support GET', (done) => {
    done();
  });

  it('should render the profile page on /profile GET', (done) => {
    done();
  });

  it('should ensure the user is authenticated on /profile GET', (done) => {
    done();
  });

  it('should render the index page on / GET', (done) => {
    done();
  });
});
