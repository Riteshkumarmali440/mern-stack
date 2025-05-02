import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import ekart from "../assets/logo1.jpg";
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import LoginModal from './LoginModal';

const Nav = () => {
  const {
    searchTerm,
    setSearchTerm,
    totalCartItems,
    isLoggedIn,
    username,
    showModal,
    setShowModal,
    handleLogout
  } = useAppContext();

  const [click, setClick] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(true);
  const profileRef = useRef();

  const handleClick = () => setClick(!click);
  const toggleProfileMenu = () => setShowProfileMenu(!showProfileMenu);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <nav className="relative bg-white shadow-md z-50">
        <div className="flex justify-between items-center py-3 px-5 md:px-8">
          {/* Logo */}
          <Link to="/home">
            <img
              src={ekart}
              alt="Logo"
              className="h-16 md:h-20 lg:h-16 transition-all transform hover:scale-110 rounded-lg"
            />
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-[16px] font-medium">
            <Link to="/home" className="hover:text-indigo-600">Home</Link>
            <Link to="/allproducts" className="hover:text-indigo-600">All Products</Link>
            <Link to="/about" className="hover:text-indigo-600">About</Link>
            <Link to="/contact" className="hover:text-indigo-600">Contact</Link>

            {/* Search */}
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden px-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 px-3 outline-none"
              />
              <button className="text-gray-600 hover:text-indigo-600 text-lg p-2">
                <FaSearch />
              </button>
            </div>

            {/* Cart */}
            <Link to="/cartItems" className="text-2xl text-indigo-600 hover:text-indigo-800 relative">
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems}
              </span>
              <FaShoppingCart />
            </Link>

            {/* Profile / Login */}
            {isLoggedIn ? (
              <div className="relative group">
                <button className="flex items-center gap-2 focus:outline-none">
                  <FaUserCircle size={32} />
                </button>

                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md hidden group-hover:block z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-300 text-sm font-medium capitalize">
                    Welcome, {username}
                  </div>

                  <Link to="/myorder">
                    <button
                      className="w-full text-left px-4 py-2 hover:bg-blue-100 border-b border-gray-200"
                    >
                      My Orders
                    </button>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-blue-100"
                  >
                    Logout
                  </button>
                </div>

              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="bg-white border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition duration-200"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <Link to="/cartItems" className="relative text-2xl text-indigo-600 hover:text-indigo-800">
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalCartItems}
              </span>
              <FaShoppingCart />
            </Link>
            <button onClick={handleClick} className="text-3xl text-indigo-600">
              {click ? <FaTimes /> : <CiMenuFries />}
            </button>
          </div>
        </div>

        {/* Mobile Nav Links */}
        {click && (
          <div className="block md:hidden bg-slate-900 text-white p-6 space-y-4">
            <Link to="/home" className="block text-lg font-medium hover:text-indigo-400" onClick={handleClick}>Home</Link>
            <Link to="/allproducts" className="block text-lg font-medium hover:text-indigo-400" onClick={handleClick}>All Products</Link>
            <Link to="/about" className="block text-lg font-medium hover:text-indigo-400" onClick={handleClick}>About</Link>
            <Link to="/contact" className="block text-lg font-medium hover:text-indigo-400" onClick={handleClick}>Contact</Link>

            {/* Mobile Search */}
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden px-2 bg-white">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 px-3 w-full outline-none text-black"
              />
              <button className="text-gray-600 hover:text-indigo-600 text-lg p-2">
                <FaSearch />
              </button>
            </div>

            {/* Profile / Login */}
            {isLoggedIn ? (
              <div className="mt-3">
                <div className="text-gray-200 mb-2">Welcome, <b>{username ? username : 'Guest'}</b></div>
                <button
                  onClick={() => {
                    logout();
                    setClick(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setShowModal(true);
                  setClick(false);
                }}
                className="block w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition"
              >
                Login
              </button>
            )}
          </div>
        )}
      </nav>

      {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default Nav;
