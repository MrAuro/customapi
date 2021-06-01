const request = require('supertest');
const app = require('../server');

describe('GET /time/conversion/983759865', () => {
    it('respond with "11d, 9h, 15m, and 59s"', (done) => {
        request(app).get('/time/conversion/983759865').expect('"11d, 9h, 15m, and 59s"', done);
    });
});
