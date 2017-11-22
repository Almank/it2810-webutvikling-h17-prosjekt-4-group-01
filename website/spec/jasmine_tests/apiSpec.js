const request = require('request');

const base_url = 'http://localhost:8084/api';

describe("API /", () => {

  describe("POST register /", () => {
    let data = {};
    beforeAll((done) => {
      request.post(base_url + '/register', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should get status 409 without params", () => {
      expect(data.status).toBe(409);
    });
  });

  describe("POST verify expiration /", () => {
    let data = {};
    beforeAll((done) => {
      request.post(base_url + '/login/verify', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should get status 500 without params", () => {
      expect(data.status).toBe(500);
    });
  });

  describe("POST login  /", () => {
    let data = {};
    beforeAll((done) => {
      request.post(base_url + '/login', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should get status 401 without params", () => {
      expect(data.status).toBe(401);
    });
  });

  describe("POST change password /", () => {
    let data = {};
    beforeAll((done) => {
      request.post(base_url + '/new_password', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should get status 500 without params", () => {
      expect(data.status).toBe(500);
    });
  });

  describe("POST find favorite movie token  /", () => {
    let data = {};
    beforeAll((done) => {
      request.post(base_url + '/favorites', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should get status 500 without params", () => {
      expect(data.status).toBe(500);
    });
  });

  describe("POST favorite movie data  /", () => {
    let data = {};
    beforeAll((done) => {
      request.post(base_url + '/favorites/data', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should get status 500 without params", () => {
      expect(data.status).toBe(500);
    });
  });

  describe("POST modify favorites  /", () => {
    let data = {};
    beforeAll((done) => {
      request.post(base_url + '/favorites/modify', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should get status 500 without params", () => {
      expect(data.status).toBe(500);
    });
  });

  describe("POST history list of movie id's  /", () => {
    let data = {};
    beforeAll((done) => {
      request.post(base_url + '/history', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should get status 500 without params", () => {
      expect(data.status).toBe(500);
    });
  });

  describe("POST history add /", () => {
    let data = {};
    beforeAll((done) => {
      request.post(base_url + '/history/add', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should get status 500 without params", () => {
      expect(data.status).toBe(500);
    });
  });

  describe("POST history data /", () => {
    let data = {};
    beforeAll((done) => {
      request.post(base_url + '/history/data', (error, response, body) => {
        data.status = response.statusCode;
        data.statusMessage = response.statusMessage;
        done();
      });
    });

    it("Should get status 500 without params", () => {
      expect(data.status).toBe(500);
    });
  });

  describe("POST Wordcloud /", () => {
    let data = {};

    beforeAll((done) => {
      request.post(base_url + '/wordcloud', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should fail with status 404", () => {
      expect(data.status).toBe(404);
    });
  });

  describe("GET WordCloud /", () => {
    let data = {};
    beforeAll((done) => {
      request.get(base_url + '/wordcloud', (error, response, body) => {
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

    it("Body contains object", () => {
      expect(data.body).toEqual(jasmine.any(Object));
    });
  });

  describe("POST Wordcloud /", () => {
    let data = {};

    beforeAll((done) => {
      request.post(base_url + '/wordcloud', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should fail with status 404", () => {
      expect(data.status).toBe(404);
    });
  });

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
    const randomInt = Math.floor(Math.random()*100);

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
      request.post(base_url + '/movies/list', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });
    it("Should fail with status 404", () => {
      expect(data.status).toBe(404);
    });
  });

  describe("GET MovieList Amount /", () => {
    let data = {};

    beforeAll((done) => {
      request.get(base_url + '/movies/amount', (error, response, body) => {
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

    it("Correct attributes are sent", () => {
      expect(data.body).toEqual(jasmine.any(Number));
    });
  });

  describe("POST MovieList Amount /", () => {
    let data = {};

    beforeAll((done) => {
      request.post(base_url + '/movies/amount', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should fail with status 404", () => {
      expect(data.status).toBe(404);
    });
  });

  describe("GET Modal Data /", () => {
    let data = {};

    beforeAll((done) => {
      request.get(base_url + '/movies/modal', (error, response, body) => {
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
  });

  describe("POST Modal Data /", () => {
    let data = {};

    beforeAll((done) => {
      request.post(base_url + '/movies/modal', (error, response) => {
        data.status = response.statusCode;
        done();
      });
    });

    it("Should fail with status 404", () => {
      expect(data.status).toBe(404);
    });
  });
});
