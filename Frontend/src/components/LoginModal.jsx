import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const LoginModal = ({ closeModal }) => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAppContext(); // Access the login function from context

  const handleAction = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      alert(`${mode === 'login' ? 'Login' : 'Signup'} Successful!`);
      closeModal();
    } else {
      alert('Invalid username or password!');
    }
  };

  return (
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
          <input
            type="text"
            placeholder="Username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            {mode === 'login' ? 'Login' : 'Signup'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
