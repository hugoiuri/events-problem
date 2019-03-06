const eventsController = (() => {
  const postEvent = (req, res) => {
    return res.status(200).send('test');
  };

  return {
    postEvent
  };
})();

module.exports = eventsController;
