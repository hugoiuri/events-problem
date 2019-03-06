const pkg = require('../../package.json');

const controller = (() => {
  const getStatus = (req, res) => {
    const health = {
      datetime: new Date(),
      service: pkg.name,
      version: pkg.version,
      container: process.env.HOSTNAME
    };

    return res.status(200).send(health);
  };

  return {
    getStatus
  };
})();

module.exports = controller;