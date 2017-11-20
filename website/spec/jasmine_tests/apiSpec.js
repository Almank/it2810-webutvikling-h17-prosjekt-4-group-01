
const request = require('request');
const base_url = 'http://localhost:8084/api';

describe("API /", () => {

  describe("GET MovieList /", () => {
    let data = {};
    beforeAll((done) => {
      request.get(base_url + '/movies/list', (error, response, body) => {
        data.status = response.statusCode;
        data.statusMessage = response.statusMessage;
        data.body = JSON.parse(body);
        done();
      });
    });

    it("Status 200", () => {
      expect(data.status).toBe(200);
      expect(data.statusMessage).toEqual('OK');
    });

    it("Body contains data", () => {
      expect(data.body.length).toBeGreaterThan(0);
    });

    it("Correct attributes are sent", () => {
      expect(data.body[0].director).toEqual(jasmine.any(Array));
      expect(data.body[0].year).toEqual(jasmine.any(Number));
      expect(data.body[0].actors).toEqual(jasmine.any(Array));
      expect(data.body[0].genre).toEqual(jasmine.any(Array));
      expect(data.body[0].title).toEqual(jasmine.any(String));
      expect(data.body[0].runtime).toBe(undefined);
      expect(data.body[0].plot).toBe(undefined);
      expect(data.body[0].readMore).toBe(undefined);
    });

    it("Body contains data", () => {
      expect(data.body.length).toBeGreaterThan(0);
    });
  });

  describe("GET MovieList limit /", () => {
    let data = {};
    const randomInt = Math.floor(Math.random()*10);

    beforeAll((done) => {
      request.get(base_url + '/movies/list?limit=' + randomInt, (error, response, body) => {
        data.body = JSON.parse(body);
        done();
      });
    });

    it("Length equals asked length", () => {
        expect(data.body.length).toEqual(randomInt);
    });
  });

  describe("POST MovieList /", () => {
    let data = {};
    beforeAll((done) => {
      request.post(base_url + '/movies/list', (error, response, body) => {
        data.status = response.statusCode;
        data.statusMessage = response.statusMessage;
        data.body = body;
        done();
      });
    });
    it("Status 404", () => {
      expect(data.status).toBe(404);
    });
  });
});
