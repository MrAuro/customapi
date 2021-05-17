const request = require('supertest');
const app = require('../server');

describe('GET /youtube/latest/UCBR8-60-B28hp2BmDPdntcQ', () => {
    it('respond with code 200', (done) => {
        request(app).get('/youtube/latest/UCBR8-60-B28hp2BmDPdntcQ').expect(200, done);
    });
});
