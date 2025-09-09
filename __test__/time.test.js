const request = require('supertest');
const server = require('../index');

describe('GET /time', () => {
    afterAll((done) => {
        server.close(done);
    });

    it('Should return 200 status', async () => {
        const res = await request(server).get('/time');
        expect(res.statusCode).toBe(200);
    });

    it('Should return JSON with serverTime', async () => {
        const res = await request(server).get('/time');
        expect(res.headers['content-type']).toMatch(/json/);
        expect(res.body).toHaveProperty('serverTime');
    });

    it('Should return serverTime in ISO format', async () => {
        const res = await request(server).get('/time');
        const date = new Date(res.body.serverTime);
        expect(isNaN(date.getTime())).toBeFalsy();
    })

    // acceptable range is denoted by being within the timeframe from before calling the endpoint to after receiving the response
    it("Should return the correct server time (within acceptable range)", async () => {
        const before = new Date();
        const res = await request(server).get("/time");
        const after = new Date();

        const serverTime = new Date(res.body.serverTime);

        expect(serverTime.getTime()).toBeGreaterThanOrEqual(before.getTime());
        expect(serverTime.getTime()).toBeLessThanOrEqual(after.getTime());
    });
});
