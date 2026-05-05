const { Client } = require('@elastic/elasticsearch');

const esClient = new Client({
  node: "http://localhost:9201"
});

module.exports = esClient;