const { eventNamesController } = require('../controller');

const { searchEventNames } = eventNamesController;

const routes = (router) => {
  router.get('/event-names', searchEventNames);
};

module.exports = routes;