const express = require('express');
const healthStatusRoutes = require('./health-status-routes');
const eventsRoutes = require('./events-routes');
const eventNamesRoutes = require('./event-names-routes');
const timelineRoutes = require('./timeline.routes');

module.exports = () => {
  const router = new express.Router();
  
  healthStatusRoutes(router);
  eventsRoutes(router);
  eventNamesRoutes(router);
  timelineRoutes(router);

  router.get('*', (req, res) => {
    res.sendStatus(404);
  })

  return router;
};
