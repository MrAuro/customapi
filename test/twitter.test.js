const request = require('supertest');
const app = require('../server');

describe('GET /twitter/latest/auror6s', () => {
    it('respond with code 200', (done) => {
        request(app).get('/twitter/latest/auror6s').expect(200, done);
    });
});
