const database = require('../database');
const eventNamesModel = require('./event-names-model');

const eventsModel = (() => {
  const create = async (event) => {
    const result = await database.getCollection('events').insertOne(event);

    await eventNamesModel.create(event.event);

    if (result.result.ok === 1 && result.ops.length === 1) {
      return result.ops[0];
    }
  }

  return {
    create
  }
})();

module.exports = eventsModel;
