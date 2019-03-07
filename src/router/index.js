const express = require('express');
const healthStatusRoutes = require('./health-status-routes');
const eventsRoutes = require('./events-routes');
const eventNamesRoutes = require('./event-names-routes');

module.exports = () => {
  const router = new express.Router();
  
  healthStatusRoutes(router);
  eventsRoutes(router);
  eventNamesRoutes(router);

  router.get('*', (req, res) => {
    res.sendStatus(404);
  })

  return router;
};
