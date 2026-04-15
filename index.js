const express = require("express");
const { Client } = require('@elastic/elasticsearch');

const app = express();
app.use(express.json())

const esClient = new Client({
  node: "http://localhost:9201"
});

app.get("/", async (req, res) => {
    try {
        const info = await esClient.info();
        res.json({
            message: "Node server and ES connected",
            es: info
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to connect to ES",
            err: error.message
        });
    }
});

app.post("/create-index", async (req, res) => {
    try {
        const exists = await esClient.indices.exists({
            index: "products"
        });

        if (exists) {
            return res.status(400).json({
                message: "Index already exists"
            });
        }

        const response = await esClient.indices.create({
            index: "products"
        });

        res.json(response);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create index on products",
            err: error.message
        })
    }
});

app.post("/add-product", async (req, res) => {
    try {
        const { id, ...product } = req.body;

        if (!id) {
            return res.status(400).json({
                message: "Id is required"
            })
        }

        const response = await esClient.index({
            index: "products",
            id: id,
            document: product
        })

        res.json({
            message: "Successfully added product",
            data: response
        })
    } catch (error) {
        res.status(500).json({
            message: "Failed to add product",
            err: error.message
        })
    }
})

app.get("/search", async (req, res) => {
    const query = req.query.q?.trim();
    const minPrice = req.query.minPrice || "";
    const maxPrice = req.query.maxPrice || "";

    try {
        if (!query) {
            return res.status(400).json({
                message: "Search query is required"
            })
        }

        const response = await esClient.search({
            index: "products",
            query: {
                bool: {
                    must: {
                        multi_match: {
                            query: query,
                            fields: ["name^3", "brand^2", "description"]
                        }
                    },
                    filter: {
                        range: {
                            price: {
                                gte: minPrice,
                                lte: maxPrice
                            }
                        }
                    }
                }
            }
        });

        res.json({
            total: response.hits.total,
            result: response.hits.hits
        })
    } catch (error) {
        res.status(500).json({
            message: `Failed to get the results for ${query}`,
            err: error
        })
    }
})

app.delete("/delete-index", async (req, res) => {
    try {
        const response = await esClient.indices.delete({
            index: "prodcuts"
        });

        res.json(response)
    } catch (error) {
        res.status(500).json({
            message: "Failed to delete index prodcuts",
            err: error.message
        })
    }
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on PORT: ${PORT}`)
})