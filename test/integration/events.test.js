process.env.NODE_ENV = 'test';

const supertest = require('supertest');
// const { assert } = require('chai');
const server = require('../../src/server');

let app;

describe('Integration test route /event', () => {
  before(async () => {
    app = await server.start();
  });

  after(async () => {
    await server.stop();
  });

  describe('POST /event', () => {
    it('Should insert a valid event', async () => {
      const event = {
        event: 'buy',
        timestamp: '2016-09-22T13:57:31.2311892-04:00'
      };

      await supertest(app).post('/events')
        .set('Content-Type', 'application/json')
        .send(event)
        .expect(200);
    });

    it('Should return bad request 400 when receive a event with invalid timestamp field', async () => {
      const event = {
        event: 'buy',
        timestamp: '6/3/2019'
      };

      await supertest(app).post('/events')
        .set('Content-Type', 'application/json')
        .send(event)
        .expect(400);
    });

    it('Should return bad request 400 when receive a event without event field', async () => {
      const event = {
        timestamp: '2016-09-22T13:57:31.2311892-04:00'
      };

      await supertest(app).post('/events')
        .set('Content-Type', 'application/json')
        .send(event)
        .expect(400);
    });

    it('Should return bad request 400 when receive a event without timestamp field', async () => {
      const event = {
        event: 'buy'
      };

      await supertest(app).post('/events')
        .set('Content-Type', 'application/json')
        .send(event)
        .expect(400);
    });
  });
});