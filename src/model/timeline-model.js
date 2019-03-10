const axios = require('axios');
const config = require('../config');

const timelineModel = (() => {
  const request = axios.create({
    baseURL: config.get('EXTERNAL_API_BASE_URL')
  });

  const getExternalEvents = async () => {
    const events = await request.get(config.get('EXTERNAL_API_EVENTS_PATH'));

    return events.data;
  };

  const normalizeEcents = events => events.map((item) => {
    const event = {
      event: item.event,
      timestamp: item.timestamp
    }

    if (item.revenue) {
      event.revenue = item.revenue;
    }

    for (let i = 0; i < item.custom_data.length; i++) {
      event[item.custom_data[i].key] = item.custom_data[i].value;
    }

    return event;
  });

  const sortByTimestamp = (a, b) => new Date(b.timestamp) - new Date(a.timestamp);

  const processEvents = (events) => {
    const normalizedEvents = normalizeEcents(events.events)

    const comprouEvents = normalizedEvents.filter(e => e.event === 'comprou');
    const comprouProdutoEvents = normalizedEvents.filter(e => e.event === 'comprou-produto');

    const timeline = comprouEvents.map((e) => {
      const products = comprouProdutoEvents.filter(cpe => cpe.transaction_id === e.transaction_id);

      const item = {
        timestamp: e.timestamp,
        revenue: e.revenue,
        transaction_id: e.transaction_id,
        store_name: e.store_name
      };

      item.products = products.map((p) => {
        return {
          name: p.product_name,
          price: p.product_price
        }
      });

      return item;
    });

    const result = {
      timeline: timeline.sort(sortByTimestamp)
    }

    return result;
  };

  const build = async () => {
    const events = await getExternalEvents();

    const timeline = processEvents(events);

    return timeline;
  };

  return {
    build
  };
})();

module.exports = timelineModel;
