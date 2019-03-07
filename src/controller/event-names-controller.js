const { eventNamesModel } = require('../model');

const eventNamesController = (() => {
  const searchEventNames = async (req, res) => {
    const text = req.query.text;

    const event = await eventNamesModel.textSearch(text);

    return res.status(200).send(event);
  };

  return {
    searchEventNames
  };
})();

module.exports = eventNamesController;
