const request = require('supertest');
const app = require('../server');

describe('GET /friday', () => {
    it('respond with code 200', (done) => {
        request(app).get('/friday').expect(200, done);
    });
});
