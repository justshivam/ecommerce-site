const mongoose = require("mongoose");

const MAX_PRICE_FIGURES = 8;
const MAX_STOCK_FIGURES = 8;

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please Enter Product Name"],
        trim: true,
    },

    description: {
        type: String,
        required: [true, "Please Enter Product Description"],
    },

    price: {
        type: Number,
        required: [true, "Please Enter Product Price"],
        maxLength: [MAX_PRICE_FIGURES, `Price Cannot Exceed ${MAX_PRICE_FIGURES} Figures`],
    },

    rating: {
        type: Number,
        default: 0,
    },

    images: [
        {
            public_id: {
                type: String,
                required: true,
            },
            url: {
                type: String,
                required: true,
            },
        },
    ],

    category: {
        type: String,
        required: [true, "Please Enter Product Category"],
    },

    stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [MAX_STOCK_FIGURES, `Stock Cannot Exceed ${MAX_STOCK_FIGURES} Figures`],
        default: 1
    },

    numberOfReviews: {
        type: Number,
        default: 0,
    },

    reviews: [
        {
            name: {
                type: String,
                required: true,
            },
            rating: {
                type: Number,
                required: true,
            },
            comment: {
                type: String,
                required: true,
            },
        },
    ],

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },


});

module.exports = mongoose.model("Product", productSchema);
