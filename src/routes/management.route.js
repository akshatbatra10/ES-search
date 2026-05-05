const express = require("express");

const { getESconfig, buildIndex, deleteIndex} = require("../search/indices/indexManager");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const response = await getESconfig();

        return res.status(200).json({
            data: response
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            err: error
        });
    }
});

router.post("/:indexName", async (req, res) => {
    try {
        const { indexName } = req.params;
        const response = await buildIndex(indexName);
        return res.status(201).json({
            data: response,
            message: "Index created successfully"
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
            err: error
        });
    }
});

router.delete("/:indexName", async (req, res) => {
    try {
        const { indexName } = req.params;
        const response = await deleteIndex(indexName);

        return res.status(200).json({
            data: response,
            message: "Index deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            err: error
        });
    }
});

module.exports = router;