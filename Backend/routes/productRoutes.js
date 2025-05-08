import express from 'express';
import multer from 'multer';
import { addProduct, productList, getAllProducts  } from '../controllers/productController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get("/product-list", productList);
router.get('/get-products', getAllProducts);
//router.post('/add-product', addProduct);
router.post("/add-product", upload.array("images", 4), addProduct);

export default router;
