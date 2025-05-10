import express from 'express';
import multer from 'multer';
import { addProduct, productList, getAllProducts,deleteProduct, updateProduct, updateStock  } from '../controllers/productController.js';
import upload from '../middlewares/upload.js';

const router = express.Router();

router.get("/product-list", productList);
router.get('/get-products', getAllProducts);
//router.post('/add-product', addProduct);
router.post("/add-product", upload.array("images", 4), addProduct);
router.delete('/delete-product/:id', deleteProduct);
router.put('/update-product/:id', upload.array('images'), updateProduct);
router.put('/update-stock/:id', updateStock);

export default router;
