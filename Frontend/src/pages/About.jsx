import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="bg-green-50 min-h-screen py-12 px-6">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h1 
          className="text-4xl font-bold text-green-800 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          About FreshHarvest
        </motion.h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
          Welcome to <span className="text-green-700 font-semibold">FreshHarvest</span>, your one-stop online destination for farm-fresh, organic, and pesticide-free vegetables. Our mission is to bring nature's bounty directly to your doorstep.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {/* Card 1 */}
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <img 
              src="https://img.freepik.com/free-photo/fresh-organic-vegetables-wooden-box_1150-40220.jpg" 
              alt="Farm Fresh Vegetables"
              className="rounded-xl mb-4 h-48 w-full object-cover"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">Farm Fresh Quality</h3>
            <p className="text-gray-600">Sourced directly from trusted local farmers to ensure ultimate freshness and quality.</p>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <img 
              src="https://img.freepik.com/free-photo/close-up-vegetable-basket_23-2148190849.jpg" 
              alt="Doorstep Delivery"
              className="rounded-xl mb-4 h-48 w-full object-cover"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">Doorstep Delivery</h3>
            <p className="text-gray-600">Get fresh vegetables delivered to your home quickly and conveniently with care.</p>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            className="bg-white p-6 rounded-2xl shadow-lg hover:scale-105 transition duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <img 
              src="https://img.freepik.com/free-photo/organic-healthy-farm-products_23-2148643209.jpg" 
              alt="Organic Choices"
              className="rounded-xl mb-4 h-48 w-full object-cover"
            />
            <h3 className="text-xl font-semibold text-green-700 mb-2">Organic & Eco-friendly</h3>
            <p className="text-gray-600">We promote healthy eating and sustainable farming by offering organic, chemical-free produce.</p>
          </motion.div>
        </div>

        <div className="mt-14">
          <motion.h2 
            className="text-3xl font-bold text-green-800 mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.7 }}
          >
            Why Choose Us?
          </motion.h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            At <span className="font-semibold text-green-700">FreshHarvest</span>, we believe in supporting local farmers, promoting healthy lifestyles, and reducing carbon footprints. Every order you place contributes to a greener planet and a healthier you.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
