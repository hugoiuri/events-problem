const { eventsModel } = require('../model');

const eventsController = (() => {
  const postEvent = async (req, res) => {
    const { body } = req;

    const event = await eventsModel.create(body);

    return res.status(201).send(event);
  };

  return {
    postEvent
  };
})();

module.exports = eventsController;
