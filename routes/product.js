import express from "express";
import { getProducts,addToCart,addToWishlist, searchProducts, createProduct, createManyProducts, getOneProduct, updateProduct, deleteProduct, createProductReview, getProductReviews, deleteReview } from "../controllers/productController.js";
import { allowedRoles, authenticateUser } from "../middlewares/authMiddleware.js";
const router = express.Router()

router.route('/products').get(getProducts);
router.route('/search/:searchText').get(searchProducts);
router.route('/product/:productId').get(getOneProduct);
router.route('/products/cart/:productId').post(authenticateUser,addToCart);
router.route('/products/wishList/:productId').post(authenticateUser,addToWishlist);
router.route('/admin/product/create').post(authenticateUser, allowedRoles("admin"), createProduct);
router.route('/admin/product/createMany').post(authenticateUser, allowedRoles("admin"), createManyProducts);
router.route('/admin/product/:productId')
    .put(authenticateUser, allowedRoles("admin"), updateProduct)
    .delete(authenticateUser, allowedRoles("admin"), deleteProduct);

router.route('/review').put(authenticateUser, createProductReview)
router.route('/reviews').get(authenticateUser, getProductReviews)
router.route('/reviews').delete(authenticateUser, deleteReview)

export default router;