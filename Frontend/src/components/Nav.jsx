import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaTimes, FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { CiMenuFries } from "react-icons/ci";
import ekart from "../assets/logo1.jpg";
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify'

const Nav = () => {
  const [click, setClick] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', password: '' });
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleLogin = (e) => {
    e.preventDefault();
    if (form.email === 'admin' && form.password === 'admin') {
      setIsLoggedIn(true);
      setUsername('admin');
      setShowModal(false);
      setForm({ email: '', password: '' });
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored"
      });
    } else {
      toast.error('Login Incredentials', {
        position: "top-right",
        autoClose: 2500,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    alert(`Welcome ${signupForm.name}! Signup successful.`);
    setActiveTab('login');
    setSignupForm({ name: '', email: '', password: '' });
  };

  return (
    <>
      <nav className="relative bg-white shadow-md">
        <div className="flex justify-between items-center py-4 px-6">
          <div className="flex items-center gap-6">
            <img
              src={ekart}
              alt="Logo"
              className="h-20 md:h-28 lg:h-20 transition-all transform hover:scale-150 hover:shadow-xl rounded-lg"
            />
          </div>

          {/* Menus */}
          <div className="hidden md:flex items-center gap-6 text-[17px] font-medium">
            <Link to="/home" className="hover:text-indigo-600">Home</Link>
            <Link to="/products" className="hover:text-indigo-600">Products</Link>
            <Link to="/about" className="hover:text-indigo-600">About</Link>
            <Link to="/contact" className="hover:text-indigo-600">Contact</Link>

            {/* Search */}
            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden px-2">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 px-3 outline-none"
              />
              <button className="text-gray-600 hover:text-indigo-600 text-lg p-2">
                <FaSearch />
              </button>
            </div>

            {/* Cart */}
            <Link to="/cart" className="text-2xl text-indigo-600 hover:text-indigo-800">
              <FaShoppingCart />
            </Link>

            {/* Login/Profile */}
            {isLoggedIn ? (
              <div ref={profileRef} className="relative">
                <button onClick={toggleProfileMenu} className="text-4xl text-indigo-600 hover:text-indigo-800">
                  <FaUserCircle />
                </button>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b text-gray-800">Welcome, <b>{username}</b></div>
                    <button
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      onClick={() => {
                        setIsLoggedIn(false);
                        setShowProfileMenu(false);
                      }}
                    >
                      Logout
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowModal(true)}
                className="px-5 py-1 border-2 border-indigo-600 text-indigo-600 rounded-md hover:bg-indigo-600 hover:text-white transition"
              >
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={handleClick} className="text-2xl">
              {click ? <FaTimes /> : <CiMenuFries />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {click && (
          <div className="lg:hidden block bg-slate-900 text-white text-center p-6">
            <ul className="space-y-4 text-lg font-bold">
              <li><Link to="/home" onClick={handleClick}>Home</Link></li>
              <li><Link to="/products" onClick={handleClick}>Products</Link></li>
              <li><Link to="/about" onClick={handleClick}>About</Link></li>
              <li><Link to="/contact" onClick={handleClick}>Contact</Link></li>
            </ul>
          </div>
        )}
      </nav>

      {/* Modal: Login & Signup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl relative"
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-4 text-gray-400 hover:text-black text-2xl"
            >
              &times;
            </button>

            <div className="flex justify-center gap-8 mb-4">
              <button
                onClick={() => setActiveTab('login')}
                className={`font-semibold ${activeTab === 'login' ? 'text-indigo-600' : 'text-gray-600'}`}
              >
                Login
              </button>
              <button
                onClick={() => setActiveTab('signup')}
                className={`font-semibold ${activeTab === 'signup' ? 'text-indigo-600' : 'text-gray-600'}`}
              >
                Signup
              </button>
            </div>

            {activeTab === 'login' ? (
              <form onSubmit={handleLogin}>
                <input
                  type="text"
                  placeholder="Username"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-full h-11 pl-4 mb-4 outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full border border-gray-300 rounded-full h-11 pl-4 mb-4 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full h-11 bg-indigo-500 text-white rounded-full hover:opacity-90"
                >
                  Login
                </button>
              </form>
            ) : (
              <form onSubmit={handleSignup}>
                <input
                  type="text"
                  placeholder="Name"
                  value={signupForm.name}
                  onChange={(e) => setSignupForm({ ...signupForm, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-full h-11 pl-4 mb-4 outline-none"
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={signupForm.email}
                  onChange={(e) => setSignupForm({ ...signupForm, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-full h-11 pl-4 mb-4 outline-none"
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={signupForm.password}
                  onChange={(e) => setSignupForm({ ...signupForm, password: e.target.value })}
                  className="w-full border border-gray-300 rounded-full h-11 pl-4 mb-4 outline-none"
                  required
                />
                <button
                  type="submit"
                  className="w-full h-11 bg-indigo-500 text-white rounded-full hover:opacity-90"
                >
                  Signup
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default Nav;
