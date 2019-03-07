const database = require('../database');

const eventNamesModel = (() => {
  const create = async (eventName) => {
    const result = await database.getCollection('eventNames')
      .findOneAndReplace({ name: eventName }, { name: eventName }, { upsert: true });

    if (result.ok === 1) {
      return result.value;
    }
  };

  const textSearch = async (text) => {
    const result = await database.getCollection('eventNames')
      .find({ name: new RegExp(`^${text}`) }, { fields: { _id: 0 } }).toArray();
    
      return result;
  };

  return {
    create,
    textSearch
  }
})();

module.exports = eventNamesModel;
