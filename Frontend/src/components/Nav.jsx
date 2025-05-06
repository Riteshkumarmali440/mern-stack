import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import { FiChevronDown } from "react-icons/fi";
import ekart from "../assets/logo1.jpg";
import { useAppContext } from '../context/AppContext';
import LoginModal from './LoginModal';

const Nav = () => {
  const {
    searchTerm,
    setSearchTerm,
    totalCartItems,
    isLoggedIn,
    name,
    userImage,
    showModal,
    setShowModal,
    handleLogout
  } = useAppContext();

  const [click, setClick] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [open, setOpen] = useState(false);

  const profileRef = useRef();
  const loginDropdownRef = useRef();

  const handleClick = () => setClick(!click);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
      if (loginDropdownRef.current && !loginDropdownRef.current.contains(e.target)) {
        setOpen(false);
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
              <div className="relative group" ref={profileRef}>
                <button className="flex items-center gap-2 focus:outline-none">
                {userImage ? (
        <img
       src={userImage} alt="User"

        onError={() => console.log("Image failed to load:", userImage)}
          
          className="w-10 h-10 rounded-full object-cover border border-gray-300"
        />
      ) : (
        <FaUserCircle size={32} />
      )}
                </button>
                <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-md hidden group-hover:block z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-300 text-sm font-medium capitalize">
                    Welcome, {name}
                  </div>
                  <Link to="/myorder">
                    <button className="w-full text-left px-4 py-2 hover:bg-blue-100 border-b border-gray-200">My Orders</button>
                  </Link>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-blue-100">Logout</button>
                </div>
              </div>
            ) : (
              <div className="relative" ref={loginDropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center border border-indigo-600 text-indigo-600 px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                  <FiChevronDown className="ml-2" />
                </button>

                {open && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded shadow-lg z-50">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-indigo-100 transition"
                    >
                      User Login
                    </button>
                    <Link
                      to="/seller/login"
                      onClick={() => setOpen(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-indigo-100 transition"
                    >
                      Seller Login
                    </Link>
                  </div>
                )}
              </div>
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
                <div className="text-gray-200 mb-2">Welcome, <b>{name}</b></div>
                <button
                  onClick={() => {
                    handleLogout();
                    setClick(false);
                  }}
                  className="block w-full text-left px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="relative" ref={loginDropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center w-full px-4 py-2 border-2 border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition"
                >
                  Login
                  <FiChevronDown className="ml-2" />
                </button>

                {open && (
                  <div className="mt-2 w-full bg-white border border-gray-200 rounded shadow-lg z-50">
                    <button
                      onClick={() => {
                        setShowModal(true);
                        setClick(false);
                        setOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-indigo-100 transition"
                    >
                      User Login
                    </button>
                    <Link
                      to="/seller/login"
                      onClick={() => {
                        setClick(false);
                        setOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-indigo-100 transition"
                    >
                      Seller Login
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </nav>

      {showModal && <LoginModal closeModal={() => setShowModal(false)} />}
    </>
  );
};

export default Nav;
