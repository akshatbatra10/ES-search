const buildProductSearchQuery = (q, minPrice, maxPrice) => {
    const must = []
    const filter = []

    if (q) {
        must.push({
            multi_match: {
                query: q,
                fields: ["name^3", "brand^2", "description"]
            }
        });
    }
    if (minPrice || maxPrice) {
        const priceRange = {};

        if (minPrice) {
            priceRange.gte = Number(minPrice);
        }
        if (maxPrice) {
            priceRange.lte = Number(maxPrice);
        }

        filter.push({
            range: {
                price: priceRange
            }
        })
    }

    return {
        bool: {
            must,
            filter
        }
    }
}

module.exports = {
    buildProductSearchQuery
}