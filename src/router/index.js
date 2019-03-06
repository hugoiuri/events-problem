const express = require('express');
const healthStatusRoutes = require('./health-status-routes');

module.exports = () => {
  const router = new express.Router();
  
  healthStatusRoutes(router);

  router.get('*', (req, res) => {
    res.sendStatus(404);
  })

  return router;
};
