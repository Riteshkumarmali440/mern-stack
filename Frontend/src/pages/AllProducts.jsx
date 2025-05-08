import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import { Star } from 'lucide-react';
import Footer from './Footer';

const AllProducts = () => {
  const { products, searchTerm, addToCart, handleRemoveFromCart, cartItems } = useAppContext();

  const filteredProducts = (Array.isArray(products) ? products : []).filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-10 text-center">
          <div className="inline-block">
            {searchTerm === '' ? 'All Products' : 'Search Results'}
            <div className="w-[200px] h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto mt-2" />
          </div>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredProducts.length === 0 && searchTerm !== '' ? (
            <p className="text-center col-span-full text-lg text-gray-500">
              No products found for "{searchTerm}"
            </p>
          ) : (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="rounded-2xl overflow-hidden shadow-lg bg-white group hover:shadow-2xl duration-300"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                   src={(product.images && product.images.length > 0) ? product.images[0] : 'fallback-image.jpg'}
                    alt={product.name}
                    className="w-full h-50 object-cover object-center group-hover:opacity-90 transition duration-300"
                  />

                </Link>

                <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">id{product.id}</h3>
                  <h3 className="text-xl font-semibold text-gray-800 mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">₹ {product.price}</p>

                  <div className="flex items-center gap-1 mb-3">
                    {Array.from({ length: Math.floor(product.rating) }).map((_, idx) => (
                      <Star key={idx} size={16} className="text-yellow-500 fill-yellow-500" />
                    ))}
                    {product.rating % 1 !== 0 && (
                      <Star size={16} className="text-yellow-500 fill-yellow-500 opacity-50" />
                    )}
                    <span className="text-sm text-gray-500 ml-1">({product.rating})</span>
                  </div>

                  {/* Add / Increment / Decrement buttons */}
                  {cartItems[product.id] ? (
                    <div className="flex items-center justify-between mt-3">
                      <button
                        onClick={() => handleRemoveFromCart(product)}
                        className="px-3 py-1 bg-red-500 text-white rounded-full"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{cartItems[product.id]}</span>
                      <button
                        onClick={() => addToCart(product)}
                        className="px-3 py-1 bg-green-500 text-white rounded-full"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(product)}
                      className="w-28 ml-auto block text-sm mt-3 bg-indigo-500 text-white py-1.5 rounded-lg hover:bg-indigo-600 transition"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AllProducts;
