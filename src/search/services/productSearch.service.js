const esClient = require("../../config/elasticsearch")

const { buildProductSearchQuery } = require("../queries/product.query")

const searchProduct = async (q, minPrice, maxPrice) => {
    try {
        const query = buildProductSearchQuery(q, minPrice, maxPrice);
        const response = await esClient.search({
            index: "products",
            query: query
        });

        return response;
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = {
    searchProduct
}