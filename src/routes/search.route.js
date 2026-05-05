const express = require("express");
const { searchProduct } = require("../search/services/productSearch.service")

const router = express.Router();

router.get("/products", async (req, res) => {
    try {
        const { q, minPrice, maxPrice } = req.query;
        const response = await searchProduct(q, minPrice, maxPrice);

        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong...",
            err: error.message
        })
    }
})

module.exports = router;