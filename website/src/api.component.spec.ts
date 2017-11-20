const request = require('http');
// const server = require('../api');

const base_url = 'http://localhost:8084/api';

describe('Api', function () {

  it('return statuscode 200', function (done) {
    request.get('http://localhost:8084/api', function (error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });

  // Testing API get request on movies
  it('returns status code 200', function (done) {
    request.get('http://localhost:8084/api/movies/list', function (error, response, body) {
      console.log(response);
      expect(response.statusCode).toEqual(200);
      done();
    });
  });

  it('returns a non empty list', function (done) {
    request.get(base_url + 'movies/list', function (error, response, body) {
      expect(response.body).toBe(true);
      done();
    });
  });
});

