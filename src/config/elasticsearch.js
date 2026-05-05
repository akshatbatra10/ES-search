const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
  node: process.env.ES_CLIENT_URL,
});

module.exports = esClient;