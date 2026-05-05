const PRODUCT_INDEX = "products_v1";

const productConfig = {
    physicalIndex: PRODUCT_INDEX,
    settings: {
        analysis: {
            analyzer: {
                custom_analyzer: {
                    type: "custom",
                    tokenizer: "standard",
                    char_filter: [
                        "html_strip"
                    ],
                    filter: [
                        "lowercase",
                        "asciifolding",
                        "kstem"
                    ]
                }
            }
        }
    },
    mappings: {
        dynamic: "strict",
        properties: {
            name: {
                type: "search_as_you_type",
                analyzer: "custom_analyzer",
                fields: {
                    keyword: {
                        type: "keyword"
                    }
                }
            },
            brand: {
                type: "keyword"
            },
            price: {
                type: "double"
            },
            description: {
                type: "text",
                analyzer: "custom_analyzer"
            }
        }
    }
};

module.exports = {
    PRODUCT_INDEX,
    productConfig
}