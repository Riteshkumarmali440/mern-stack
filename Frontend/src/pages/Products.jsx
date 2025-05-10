import React from "react";
import { useParams, Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Products = () => {
  const { id } = useParams();
  const { products, addToCart } = useAppContext();

  if (!products || products.length === 0) {
    return <p className="text-center mt-10 text-xl">Loading products...</p>;
  }

  // ✅ corrected from item.id to item._id
  const product = products.find(
    (item) => item && item._id.toString() === id
  );

  if (!product) {
    return (
      <p className="text-center mt-10 text-xl">Product not found!</p>
    );
  }

  const [thumbnail, setThumbnail] = React.useState(product.images[0]);

  return (
    <div className="max-w-6xl mx-auto w-full px-6 py-6">
      <p className="text-gray-500 text-sm">
        <Link to="/home">Home</Link> /
        <Link to="/allproducts"> Products</Link> /
        <span className="text-indigo-500"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-6">
        <div className="flex gap-4">
          <div className="flex flex-col gap-2">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Thumbnail ${idx}`}
                onClick={() => setThumbnail(img)}
                className="border rounded-md w-24 h-24 object-cover cursor-pointer hover:ring-2 ring-indigo-400"
              />
            ))}
          </div>
          <div className="border rounded-md max-w-sm overflow-hidden">
            <div className="w-full h-90">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold">{product.name}</h1>

          <div className="mt-6">
            <p className="text-gray-500 line-through">MRP: Rs.{product.price}</p>
            <p className="text-2xl font-medium">Offer Price: Rs.{product.offerPrice}</p>
          </div>

          <p className="mt-6 text-lg font-medium">About Product</p>
          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="flex gap-4 mt-8">
            <button className="flex-1 py-3 bg-gray-100 text-gray-800 hover:bg-gray-200 rounded-md font-medium"  onClick={() => addToCart(product)}>
              Add to Cart
            </button>
            <button className="flex-1 py-3 bg-orange-500 text-white hover:bg-indigo-600 rounded-md font-medium">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
