import React from "react";
import { FiPackage, FiList, FiShoppingCart, FiClock } from "react-icons/fi";
import { useAppContext } from '../context/AppContext';

const SellerDashboard = () => {
  const {name} = useAppContext();
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Seller Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-5 bg-white shadow rounded flex items-center gap-4 hover:shadow-lg transition">
          <FiPackage className="text-indigo-600 text-3xl" />
          <div>
            <p className="text-gray-600">Total Products {name}</p>
            <h2 className="text-2xl font-bold text-gray-800">156</h2>
          </div>
        </div>

        <div className="p-5 bg-white shadow rounded flex items-center gap-4 hover:shadow-lg transition">
          <FiList className="text-pink-500 text-3xl" />
          <div>
            <p className="text-gray-600">Product Categories</p>
            <h2 className="text-2xl font-bold text-gray-800">7</h2>
          </div>
        </div>

        <div className="p-5 bg-white shadow rounded flex items-center gap-4 hover:shadow-lg transition">
          <FiShoppingCart className="text-green-500 text-3xl" />
          <div>
            <p className="text-gray-600">Total Orders</p>
            <h2 className="text-2xl font-bold text-gray-800">89</h2>
          </div>
        </div>

        <div className="p-5 bg-white shadow rounded flex items-center gap-4 hover:shadow-lg transition">
          <FiClock className="text-yellow-500 text-3xl" />
          <div>
            <p className="text-gray-600">Pending Orders</p>
            <h2 className="text-2xl font-bold text-gray-800">12</h2>
          </div>
        </div>
      </div>

      {/* You can add more stats or latest orders table etc below */}
    </div>
  );
};

export default SellerDashboard;
