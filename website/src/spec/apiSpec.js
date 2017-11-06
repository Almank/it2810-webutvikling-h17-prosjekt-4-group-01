const request = require("request");

const base_url = "http://localhost:8084/api";

// Testing if server is up and running.
describe("GET /", function() {
  it("returns status code 200", function(done) {
    request.get('http://localhost:8084', function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(response.body.length).toBe(805);
      done();
    });
  });
});

// Testing if api is working.
describe("GET /", function() {
  it("returns status code 200", function(done) {
    request.get(base_url, function(error, response, body) {
      expect(response.statusCode).toBe(200);
      expect(response.body).toBe("api works");
      done();
    });
  });
});

// Testing API get request on movies
describe("GET /", function() {
  it("returns status code 200", function(done) {
    request.get(base_url + '/movies', function(error, response, body) {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
});
