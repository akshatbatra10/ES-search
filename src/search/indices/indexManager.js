const esClient = require("../../config/elasticsearch");

const { productConfig } = require("./product.index");

const indexConfig = {
    "products": productConfig
}

const checkIndexExists = async (indexName) => {
    try {
        const physicalName = indexConfig[indexName].physicalIndex;
        const doesExits = await esClient.indices.exists({
            index: physicalName
        });

        return doesExits;
    } catch (error) {
        throw new Error(error.message);
    }
}

const getESconfig = async () => {
    try {
        const info = await esClient.info();

        return info;
    } catch (error) {
        throw new Error(error.message);
    }
}

const buildIndex = async (indexName) => {
    try {
        if (!indexConfig[indexName]) {
            throw new Error(`No configuration found for index: ${indexName}`);
        }

        const exists = await checkIndexExists(indexName);
        if (exists) {
            throw new Error("Index already exists!");
        }

        const { physicalIndex, settings, mappings } = indexConfig[indexName];

        const response = await esClient.indices.create({
            index: physicalIndex,
            settings: settings,
            mappings: mappings,
            aliases: {
                [indexName]: {}
            }
        });

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

const deleteIndex = async (indexName) => {
    try {
        if (!indexConfig[indexName]) {
            throw new Error(`No configuration found for index: ${indexName}`);
        }

        const exists = await checkIndexExists(indexName);
        if (!exists) {
            throw new Error("Index trying to delete does not exists!");
        }

        const physicalName = indexConfig[indexName].physicalIndex;
        const response = await esClient.indices.delete({
            index: physicalName
        })

        return response;
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    getESconfig,
    buildIndex,
    deleteIndex
}