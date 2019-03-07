process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const { assert } = require('chai');
const database = require('../database');
const server = require('../../src/server');
const collectionName = 'eventNames';

let app;
let db;

describe('Integration test route /event', () => {
  before(async () => {
    db = await database.createDatabase();
    app = await server.start();
  });

  after(async () => {
    await server.stop();
    await database.dropDatabase();
  });

  afterEach(async () => {
    await database.clearCollection(collectionName);
  });

  describe('GET /event-names', () => {
    it('Should search event name when starts with text', async () => {
      await db.collection(collectionName).insertOne({name: 'comprou'});

      const result = await supertest(app).get('/event-names?text=co')
        .set('Content-Type', 'application/json')
        .expect(200);

        assert.deepEqual(result.body, [{ name: 'comprou' }]);
    });

    it('Should search all event name when starts with text', async () => {
      await db.collection(collectionName).insertOne({name: 'comprou'});
      await db.collection(collectionName).insertOne({name: 'comprou-produto'});

      const result = await supertest(app).get('/event-names?text=co')
        .set('Content-Type', 'application/json')
        .expect(200);

        assert.deepEqual(result.body, [{ name: 'comprou' }, { name: 'comprou-produto' }]);
    });

    it('Should ignore events that name does not match text', async () => {
      await db.collection(collectionName).insertOne({name: 'comprou'});
      await db.collection(collectionName).insertOne({name: 'visualizou'});

      const result = await supertest(app).get('/event-names?text=vi')
        .set('Content-Type', 'application/json')
        .expect(200);

        assert.deepEqual(result.body, [{ name: 'visualizou' }]);
    });

    it('Should return a empty array when there are not event names matching text', async () => {
      await db.collection(collectionName).insertOne({name: 'comprou'});

      const result = await supertest(app).get('/event-names?text=vi')
        .set('Content-Type', 'application/json')
        .expect(200);

        assert.deepEqual(result.body, []);
    });
  });
});