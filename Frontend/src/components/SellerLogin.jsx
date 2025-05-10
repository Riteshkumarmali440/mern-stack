import React, { useState } from "react";
import {  useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useAppContext } from '../context/AppContext';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const SellerLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { handleLogin } = useAppContext();
 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/api/seller/sellerLogin',
        { email, password }, // Key line: isSeller flag
        { headers: { 'Content-Type': 'application/json' } }
      );

      const { name, avatar } = response.data.user;
      const { token, user } = response.data;
      console.log("response",response)
      toast.success('Seller login successful');
      localStorage.setItem('sellerToken', token);
      // Optionally also store user info if you need it later
      localStorage.setItem('sellerInfo', JSON.stringify(user));
      navigate('/seller/dashboard');
      handleLogin(name, avatar);

    } catch (error) {
      console.log("response",error);
      toast.error(error.response?.data?.message || 'Login failed');
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Seller Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-600 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SellerLogin;
