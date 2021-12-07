const { request } = require('express');
const Product = require('../models/productModel');

// Create a new product -- Admin
exports.createProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
}

// Get All Products
exports.getAllProducts = async (req, res) => {
    const products = await Product.find();
    res.status(200).json({ message: "success", products })
}

// Update a product -- Admin
exports.updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    };

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    return res.status(200).json({
        success: true,
        product
    })
}

// Delete Product
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    };
    await product.remove();
    return res.status(200).json({
        success: true,
        message: "Product Deleted Successfully"
    })
}

// Get Product Details
exports.productDetails = async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product Not Found"
        })
    };
    return res.status(200).json({
        success: true,
        product
    })
}