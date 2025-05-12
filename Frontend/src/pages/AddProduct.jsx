import React, { useState, useEffect } from 'react';

const AddProduct = () => {
  const [product, setProduct] = useState({
    images: [],
    name: '',
    description: '',
    category: '',
    price: '',
    offerPrice: ''
  });

  const [products, setProducts] = useState([]);
  const [editingProductId, setEditingProductId] = useState(null);



  useEffect(() => {
    fetchProducts();
  }, []);

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e, index) => {
    const files = e.target.files;
    if (files.length) {
      const updatedImages = [...product.images];
      updatedImages[index] = URL.createObjectURL(files[0]);
      setProduct({ ...product, images: updatedImages });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      product.images.forEach((image, index) => {
        const file = document.getElementById(`image${index}`).files[0];
        if (file) {
          formData.append('images', file);
        }
      });

      formData.append('name', product.name);
      formData.append('description', product.description);
      formData.append('category', product.category);
      formData.append('price', product.price);
      formData.append('offerPrice', product.offerPrice);
      formData.append('instock', true); // or set dynamically if needed
      // const sellerInfo = JSON.parse(localStorage.getItem('sellerInfo'));
      // if (!sellerInfo?.id) {
      //   alert('Seller not authenticated!');
      //   return;
      // }
      // formData.append('seller', sellerInfo.id);

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/add-product`, {

        method: 'POST',
        body: formData
      });

      const result = await response.json();
      console.log('Product Added:', result);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/getproduct/get-products`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/delete-product/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        alert('Product deleted successfully!');
        fetchProducts();
      } else {
        alert('Failed to delete product.');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  const handleEdit = (prod) => {
    setEditingProductId(prod._id);
    setProduct({
      images: [],
      name: prod.name,
      description: prod.description,
      category: prod.category,
      price: prod.price,
      offerPrice: prod.offerPrice
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatedProduct = {
        name: product.name,
        description: product.description,
        category: product.category,
        price: product.price,
        offerPrice: product.offerPrice,
        instock: true
      };

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/product/update-product/${editingProductId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });

      if (response.ok) {
        alert('Product updated successfully!');
        setEditingProductId(null);
        setProduct({
          images: [],
          name: '',
          description: '',
          category: '',
          price: '',
          offerPrice: ''
        });
        fetchProducts();
      } else {
        alert('Failed to update product.');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };



  return (
    <div className="py-10 flex flex-col justify-between bg-white">
      <div className="px-2 py-2 text-2xl font-bold text-indigo-600">Add Product</div>

      <form onSubmit={handleSubmit} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  accept="image/*"
                  type="file"
                  id={`image${index}`}
                  hidden
                  onChange={(e) => handleImageChange(e, index)}
                />
                <img
                  className="max-w-24 cursor-pointer rounded border"
                  src={
                    product.images[index]
                      ? product.images[index]
                      : 'https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/uploadArea.png'
                  }
                  alt="upload Image"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="name">Product Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={product.name}
            onChange={handleInputChange}
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="description">Product Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
          >
            <option value="">Select Category</option>
            {['Vegetables', 'Fruits', 'Grocery'].map((item, index) => (
              <option key={index} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-5 flex-wrap">
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="price">Product Price</label>
            <input
              id="price"
              name="price"
              type="number"
              value={product.price}
              onChange={handleInputChange}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
          <div className="flex-1 flex flex-col gap-1 w-32">
            <label className="text-base font-medium" htmlFor="offerPrice">Offer Price</label>
            <input
              id="offerPrice"
              name="offerPrice"
              type="number"
              value={product.offerPrice}
              onChange={handleInputChange}
              placeholder="0"
              className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
              required
            />
          </div>
        </div>

        <div className="flex gap-4">
          {!editingProductId && (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
            >
              Add Product
            </button>
          )}

          {editingProductId && (
            <button
              type="button"
              onClick={handleUpdate}
              className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition duration-200"
            >
              Update Product
            </button>
          )}
        </div>
      </form>
      <div className="mt-10">
        <h2 className="text-xl font-bold mb-4">Your Products</h2>
        <div className="overflow-x-auto"> {/* Added scrollable container */}
          <table className="min-w-full bg-white table-auto">
            <thead>
              <tr>
                <th className="py-2 text-left">Name</th>
                <th className="py-2 text-left">Category</th>
                <th className="py-2 text-left">Price</th>
                <th className="py-2 text-left">Offer Price</th>
                <th className="py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((prod) => (
                <tr key={prod._id} className="border-t">
                  <td className="py-2 px-2">{prod.name}</td>
                  <td className="py-2 px-2">{prod.category}</td>
                  <td className="py-2 px-2">{prod.price}</td>
                  <td className="py-2 px-2">{prod.offerPrice}</td>
                  <td className="py-2 px-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => handleEdit(prod)}
                      className="bg-yellow-500 text-white px-4 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(prod._id)}
                      className="bg-red-500 text-white px-4 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>

  );
};

export default AddProduct;
