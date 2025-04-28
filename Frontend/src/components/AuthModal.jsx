import React, { useState } from 'react'
import { motion } from 'framer-motion'

const AuthModal = ({ onClose }) => {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="bg-white w-full max-w-sm p-6 rounded-2xl shadow-xl relative"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-black text-2xl"
        >
          &times;
        </button>

        <h1 className="text-2xl font-bold text-center mb-4">
          {isSignUp ? 'Sign Up' : 'Login'}
        </h1>

        <form>
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 rounded-full h-11 pl-4 mb-4 outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-full h-11 pl-4 mb-4 outline-none"
            required
          />
          {isSignUp && (
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded-full h-11 pl-4 mb-4 outline-none"
            />
          )}

          <button
            type="submit"
            className="w-full h-11 bg-indigo-500 text-white rounded-full hover:opacity-90"
          >
            {isSignUp ? 'Create Account' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-3">
          {isSignUp ? 'Already have an account?' : `Don't have an account?`}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-indigo-500 ml-1 font-medium"
          >
            {isSignUp ? 'Login' : 'Sign up'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}

export default AuthModal
