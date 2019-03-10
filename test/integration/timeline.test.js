process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const { assert } = require('chai');
const nock = require('nock');
const config = require('../../src/config');
const server = require('../../src/server');

let app;

describe('Integration test route /timeline', () => {
  before(async () => {
    app = await server.start();
  });

  after(async () => {
    await server.stop();
  });

  describe('GET /timeline', () => {
    it('Should return the correct timeline', async () => {
      const expected = {
        timeline: [
          {
            timestamp: '2016-10-02T11:37:31.2300892-03:00',
            revenue: 120.0,
            transaction_id: '3409340',
            store_name: 'BH Shopping',
            products: [
              {
                name: 'Tenis Preto',
                price: 120
              }
            ]
          }
        ]
      };

      nock(config.get('EXTERNAL_API_BASE_URL'))
        .get(config.get('EXTERNAL_API_EVENTS_PATH'))
        .reply(200, {
          events: [
            {
              event: 'comprou-produto',
              timestamp: '2016-10-02T11:37:35.2300892-03:00',
              custom_data: [
                {
                  key: 'transaction_id',
                  value: '3409340'
                },
                {
                  key: 'product_name',
                  value: 'Tenis Preto'
                },
                {
                  key: 'product_price',
                  value: 120
                }
              ]
            },
            {
              event: 'comprou',
              timestamp: '2016-10-02T11:37:31.2300892-03:00',
              revenue: 120,
              custom_data: [
                {
                  key: 'transaction_id',
                  value: '3409340'
                },
                {
                  key: 'store_name',
                  value: 'BH Shopping'
                }
              ]
            }
          ]
        });

      const result = await supertest(app).get('/timeline')
        .set('Content-Type', 'application/json')
        .expect(200);

      assert.deepEqual(result.body, expected);
    });

    it('Should return the correct timeline with multiple itens', async () => {
      const expected = {
        timeline: [
          {
            timestamp: '2016-10-02T11:37:31.2300892-03:00',
            revenue: 120.0,
            transaction_id: '3409340',
            store_name: 'BH Shopping',
            products: [
              {
                name: 'Tenis Preto',
                price: 120
              }
            ]
          },
          {
            timestamp: '2016-09-22T13:57:31.2311892-03:00',
            revenue: 250.0,
            transaction_id: '3029384',
            store_name: 'Patio Savassi',
            products: [
              {
                name: 'Camisa Azul',
                price: 100
              },
              {
                name: 'Calça Rosa',
                price: 150
              }
            ]
          }
        ]
      };

      nock(config.get('EXTERNAL_API_BASE_URL'))
        .get(config.get('EXTERNAL_API_EVENTS_PATH'))
        .reply(200, {
          events: [
            {
              event: 'comprou-produto',
              timestamp: '2016-09-22T13:57:32.2311892-03:00',
              custom_data: [
                {
                  key: 'product_name',
                  value: 'Camisa Azul'
                },
                {
                  key: 'transaction_id',
                  value: '3029384'
                },
                {
                  key: 'product_price',
                  value: 100
                }
              ]
            },
            {
              event: 'comprou',
              timestamp: '2016-09-22T13:57:31.2311892-03:00',
              revenue: 250,
              custom_data: [
                {
                  key: 'store_name',
                  value: 'Patio Savassi'
                },
                {
                  key: 'transaction_id',
                  value: '3029384'
                }
              ]
            },
            {
              event: 'comprou-produto',
              timestamp: '2016-09-22T13:57:33.2311892-03:00',
              custom_data: [
                {
                  key: 'product_price',
                  value: 150
                },
                {
                  key: 'transaction_id',
                  value: '3029384'
                },
                {
                  key: 'product_name',
                  value: 'Calça Rosa'
                }
              ]
            },
            {
              event: 'comprou-produto',
              timestamp: '2016-10-02T11:37:35.2300892-03:00',
              custom_data: [
                {
                  key: 'transaction_id',
                  value: '3409340'
                },
                {
                  key: 'product_name',
                  value: 'Tenis Preto'
                },
                {
                  key: 'product_price',
                  value: 120
                }
              ]
            },
            {
              event: 'comprou',
              timestamp: '2016-10-02T11:37:31.2300892-03:00',
              revenue: 120,
              custom_data: [
                {
                  key: 'transaction_id',
                  value: '3409340'
                },
                {
                  key: 'store_name',
                  value: 'BH Shopping'
                }
              ]
            }
          ]
        });

      const result = await supertest(app).get('/timeline')
        .set('Content-Type', 'application/json')
        .expect(200);

      assert.deepEqual(result.body, expected);
    });

    it('Should return the correct timeline ordered by timestamp', async () => {
      const expected = {
        timeline: [
          {
            timestamp: '2016-10-02T11:37:31.2300892-03:00',
            revenue: 120.0,
            transaction_id: '3409340',
            store_name: 'BH Shopping',
            products: [
              {
                name: 'Tenis Preto',
                price: 120
              }
            ]
          },
          {
            timestamp: '2016-09-22T13:57:31.2311892-03:00',
            revenue: 250.0,
            transaction_id: '3029384',
            store_name: 'Patio Savassi',
            products: [
              {
                name: 'Camisa Azul',
                price: 100
              },
              {
                name: 'Calça Rosa',
                price: 150
              }
            ]
          }
        ]
      };

      nock(config.get('EXTERNAL_API_BASE_URL'))
        .get(config.get('EXTERNAL_API_EVENTS_PATH'))
        .reply(200, {
          events: [
            {
              event: 'comprou-produto',
              timestamp: '2016-09-22T13:57:32.2311892-03:00',
              custom_data: [
                {
                  key: 'product_name',
                  value: 'Camisa Azul'
                },
                {
                  key: 'transaction_id',
                  value: '3029384'
                },
                {
                  key: 'product_price',
                  value: 100
                }
              ]
            },
            {
              event: 'comprou',
              timestamp: '2016-09-22T13:57:31.2311892-03:00',
              revenue: 250,
              custom_data: [
                {
                  key: 'store_name',
                  value: 'Patio Savassi'
                },
                {
                  key: 'transaction_id',
                  value: '3029384'
                }
              ]
            },
            {
              event: 'comprou-produto',
              timestamp: '2016-09-22T13:57:33.2311892-03:00',
              custom_data: [
                {
                  key: 'product_price',
                  value: 150
                },
                {
                  key: 'transaction_id',
                  value: '3029384'
                },
                {
                  key: 'product_name',
                  value: 'Calça Rosa'
                }
              ]
            },
            {
              event: 'comprou-produto',
              timestamp: '2016-10-02T11:37:35.2300892-03:00',
              custom_data: [
                {
                  key: 'transaction_id',
                  value: '3409340'
                },
                {
                  key: 'product_name',
                  value: 'Tenis Preto'
                },
                {
                  key: 'product_price',
                  value: 120
                }
              ]
            },
            {
              event: 'comprou',
              timestamp: '2016-10-02T11:37:31.2300892-03:00',
              revenue: 120,
              custom_data: [
                {
                  key: 'transaction_id',
                  value: '3409340'
                },
                {
                  key: 'store_name',
                  value: 'BH Shopping'
                }
              ]
            }
          ]
        });

      const result = await supertest(app).get('/timeline')
        .set('Content-Type', 'application/json')
        .expect(200);

      assert.deepEqual(result.body, expected);
      assert.isTrue(result.body.timeline[0].timestamp > result.body.timeline[1].timestamp)
    });

    it('Should return the correct timeline when external events API does not return comprou-produto event', async () => {
      const expected = {
        timeline: [
          {
            timestamp: '2016-10-02T11:37:31.2300892-03:00',
            revenue: 120.0,
            transaction_id: '3409340',
            store_name: 'BH Shopping',
            products: []
          }
        ]
      };

      nock(config.get('EXTERNAL_API_BASE_URL'))
        .get(config.get('EXTERNAL_API_EVENTS_PATH'))
        .reply(200, {
          events: [
            {
              event: 'comprou',
              timestamp: '2016-10-02T11:37:31.2300892-03:00',
              revenue: 120,
              custom_data: [
                {
                  key: 'transaction_id',
                  value: '3409340'
                },
                {
                  key: 'store_name',
                  value: 'BH Shopping'
                }
              ]
            }
          ]
        });

      const result = await supertest(app).get('/timeline')
        .set('Content-Type', 'application/json')
        .expect(200);

      assert.deepEqual(result.body, expected);
    });

    it('Should return internal server error 500 when external events api return a invalid response', async () => {
      nock(config.get('EXTERNAL_API_BASE_URL'))
        .get(config.get('EXTERNAL_API_EVENTS_PATH'))
        .reply(200, {
          event: 'comprou',
          timestamp: '2016-10-02T11:37:31.2300892-03:00',
          revenue: 120,
          custom_data: [
            {
              key: 'transaction_id',
              value: '3409340'
            },
            {
              key: 'store_name',
              value: 'BH Shopping'
            }
          ]
        });

      await supertest(app).get('/timeline')
        .set('Content-Type', 'application/json')
        .expect(500);
    });
  });
});