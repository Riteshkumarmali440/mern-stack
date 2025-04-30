import React from 'react'
import { motion } from 'framer-motion'
import { useAppContext } from '../context/AppContext'
import vegetable from '../assets/vegetable1.jpg'
import fruits from '../assets/fruit1.jpg'
import grocery from '../assets/grocery.jpg'
import dry from '../assets/dry.jpg'
import other from '../assets/other.jpg'
import home from '../assets/veg.jpg'
import Footer from '../pages/Footer'
import NewsLetter from '../pages/NewsLetter'

const Home = () => {
  const { searchTerm } = useAppContext()

  const products = [
    { name: 'Vegetables', price: 'starts from- Rs.20', image: vegetable },
    { name: 'Fruits', price: 'starts from- Rs.30', image: fruits },
    { name: 'Grocery', price: 'starts from- Rs.60', image: grocery },
    { name: 'Dry Fruits', price: 'starts from- Rs.80', image: dry },
    { name: 'Others', price: 'starts from- Rs.40', image: other },
  ]

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      <div className="min-h-screen">
        {searchTerm === '' && (
          <div className="relative w-[95%] max-w-7xl h-[400px] overflow-hidden mx-auto mt-10 rounded-2xl shadow-lg">
            <motion.img
              src={home}
              alt="Hero Banner"
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent flex flex-col items-start justify-center text-white text-left p-8 ">
              <motion.h1
                className="text-5xl md:text-7xl font-extrabold mb-6"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                Discover Trending Styles
              </motion.h1>
              <motion.p
                className="text-xl md:text-3xl mb-8 leading-relaxed"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                Shop the latest collections and embrace the trendiest looks of the season.
              </motion.p>
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white text-black px-8 py-4 rounded-2xl text-lg md:text-xl font-semibold hover:bg-gray-200 transition duration-200"
              >
                Shop Now
              </motion.button>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="max-w-7xl mx-auto py-16 px-4">
          <h2 className="text-3xl font-bold mb-8 text-left text-gray-800">
            {searchTerm === '' ? 'Categories' : 'Search Results'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="rounded-2xl overflow-hidden shadow-xl bg-white"
              >
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mt-2 text-lg">{product.price}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="text-center text-lg mt-10 text-gray-500">No categories found.</p>
          )}
        </div>
      </div>

      {searchTerm === '' && (
        <>
          <NewsLetter />
        </>
      )}
       <Footer />
    </>
  )
}

export default Home
