const express = require('express');
const healthStatusRoutes = require('./health-status-routes');
const eventRoutes = require('./events-routes');

module.exports = () => {
  const router = new express.Router();
  
  healthStatusRoutes(router);
  eventRoutes(router);

  router.get('*', (req, res) => {
    res.sendStatus(404);
  })

  return router;
};
