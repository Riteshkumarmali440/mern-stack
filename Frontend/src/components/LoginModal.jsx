import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useAppContext } from '../context/AppContext';
import axios from 'axios';

const LoginModal = ({ closeModal }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
 const [name, setName] = useState('');
  //const [name, setNameLocal] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const { handleLogin,  setUserImage } = useAppContext();

  const handleAction = async (e) => {
    e.preventDefault();
  
    let apiUrl;
    let payload;
    let headers;
  
    if (mode === 'signup') {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('password', password);
      formData.append('isAdmin', isAdmin);
      if (avatar) formData.append('avatar', avatar);
  
      apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/users/register`;
      payload = formData;
      headers = { 'Content-Type': 'multipart/form-data' };
      toast.success("Registration successfull....");
    } else {
      // login — send JSON
      apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/users/login`;
      payload = { email, password };
      headers = { 'Content-Type': 'application/json' };
    }
  
    try {
      const response = await axios.post(apiUrl, payload, { headers });
  
      if (mode === 'login') {
        const { name, avatar, _id, email } = response.data.user;
       
        setName(name);
        //setUserImage({ name, avatar,});
        console.log('Name from DB:', name);
        console.log('Image from DB:', avatar);
        console.log('email from DB:', email);
        console.log('ID from DB:', _id);
     
        toast.success('Login Successful!');
        localStorage.setItem('userInfo', JSON.stringify({
          name,
          email,
          _id,
          avatar: `http://localhost:5000/uploads/${avatar}`
        }));
        handleLogin(name, avatar);  
        
      } else {
        toast.success('Signup Successful!');
      }
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };
  
  return (
    <>
      <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
        <div className="bg-white rounded-lg w-96 p-6 shadow-lg relative">
          <button
            onClick={closeModal}
            className="absolute top-2 right-3 text-2xl text-gray-600 hover:text-red-600"
          >
            ×
          </button>

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setMode('login')}
              className={`px-4 py-2 rounded-l ${
                mode === 'login' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`px-4 py-2 rounded-r ${
                mode === 'signup' ? 'bg-indigo-600 text-white' : 'bg-gray-200'
              }`}
            >
              Signup
            </button>
          </div>

          <h2 className="text-2xl mb-4 font-semibold text-center capitalize">
            {mode}
          </h2>

          <form onSubmit={handleAction} className="space-y-4">
            {mode === 'signup' && (
              <>
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                  className="w-full border border-gray-300 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </>
            )}

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
            />

            {mode === 'signup' && (
              <>
                <input
                  type="file"
                  onChange={(e) => setAvatar(e.target.files[0])}
                  className="w-full border border-gray-300 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label>
                  <input
                    type="checkbox"
                    checked={isAdmin}
                    onChange={() => setIsAdmin(!isAdmin)}
                  />
                  Is Admin
                </label>
              </>
            )}

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              {mode === 'login' ? 'Login' : 'Signup'}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable={true}
      />
    </>
  );
};

export default LoginModal;
