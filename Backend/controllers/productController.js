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
    const { name, description, category, price, offerPrice, seller, instock  } = req.body;

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
      instock,
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

// Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    //Optional: fetch the product first if you want to remove images from Cloudinary too
    const product = await Product.findById(id);
    if (product) {
      await Promise.all(
        product.images.map(async (imageUrl) => {
          const publicId = imageUrl.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(`products/${publicId}`);
        })
      );
    }

    await Product.findByIdAndDelete(id);

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, description, category, price, offerPrice, instock } = req.body;

    const updatedFields = {
      name,
      description,
      category,
      price,
      offerPrice,
      instock
    };

    // If new images uploaded
    if (req.files && req.files.length > 0) {
      const images = await Promise.all(
        req.files.map(async (file) => {
          const result = await cloudinary.uploader.upload(file.path, { folder: 'products' });
          return result.secure_url;
        })
      );
      updatedFields.images = images;
    }

    await Product.findByIdAndUpdate(id, updatedFields);

    res.json({ success: true, message: 'Product updated successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { instock } = req.body;

    const updatedStock = await Product.findByIdAndUpdate(
      req.params.id,
      { instock },
      { new: true }
    );

    res.status(200).json({ message: 'Stock updated successfully', product: updatedStock });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update stock', error });
  }
};
