import { v2 as cloudinary } from "cloudinary";
import Product from "../models/Product.js";

// Configure Cloudinary (if not already configured elsewhere)
cloudinary.config({
  cloud_name: 'dq76my9ye',
  api_key: '626379246275481',
  api_secret: 'DQAz0FG-Yen5-CJvLEufcNiK3VQ'
});

// Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, description, category, price, offerPrice } = req.body;

    const images = await Promise.all(
      req.files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, { folder: 'products' });
        return result.secure_url;
      })
    );

    const newProduct = new Product({
      name,
      description,
      category,
      price,
      offerPrice,
      images,
    });

    await newProduct.save();

    res.status(201).json({ success: true, message: 'Product added successfully' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to add product', error });
  }
};



export const getAllProducts = async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ message: 'Failed to fetch products' });
    }
  };

export const productList = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const productById = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res.json({ success: true, product });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export const changestock = async (req, res) => {
  try {
    const { id, instock } = req.body;
    await Product.findByIdAndUpdate(id, { instock });
    res.json({ success: true, message: 'Stock Updated' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

