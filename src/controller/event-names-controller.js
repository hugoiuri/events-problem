const { eventNamesModel } = require('../model');

const eventNamesController = (() => {
  const searchEventNames = async (req, res, next) => {
    try {
      const text = req.query.text;

      const event = await eventNamesModel.textSearch(text);

      return res.status(200).send(event);
    } catch (error) {
      next(error);
    }
  };

  return {
    searchEventNames
  };
})();

module.exports = eventNamesController;
