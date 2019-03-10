const { timelineController } = require('../controller');

const { getTimeline } = timelineController;

const routes = (router) => {
  router.get('/timeline', getTimeline);
};

module.exports = routes;