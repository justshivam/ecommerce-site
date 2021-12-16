const express = require('express');
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    productDetails,
    createProductReview,
    getProductReviews,
    deleteReview
} = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/auth');

const router = express.Router();


router.route('/products').get(isAuthenticatedUser, authorizeRoles('admin'), getAllProducts);

router.route('/product/new').post(createProduct);

router.route('/product/:id').put(updateProduct).delete(deleteProduct).get(productDetails);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;