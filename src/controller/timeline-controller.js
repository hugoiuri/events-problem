const { timelineModel } = require('../model');

const timelineController = (() => {
  const getTimeline = async (req, res, next) => {
    try {
      const timeline = await timelineModel.build();
      res.status(200).send(timeline);
    } catch (error) {
      next(error);
    }
  };

  return {
    getTimeline
  };
})();

module.exports = timelineController;
