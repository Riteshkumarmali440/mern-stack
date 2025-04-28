import React, { useState } from 'react'

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true)

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form className="max-w-96 w-full text-center border border-gray-300/60 rounded-2xl px-8 bg-white shadow-lg">
        <h1 className="text-gray-900 text-3xl mt-10 font-medium">
          {isLogin ? 'Login' : 'Sign Up'}
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          {isLogin ? 'Please sign in to continue' : 'Create a new account'}
        </p>

        {/* Email input */}
        <div className="flex items-center w-full mt-10 bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="email"
            placeholder="Email"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Password input */}
        <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
          <input
            type="password"
            placeholder="Password"
            className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
            required
          />
        </div>

        {/* Confirm password for SignUp only */}
        {!isLogin && (
          <div className="flex items-center mt-4 w-full bg-white border border-gray-300/80 h-12 rounded-full overflow-hidden pl-6 gap-2">
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-transparent text-gray-500 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
            />
          </div>
        )}

        {/* Forgot password link */}
        {isLogin && (
          <div className="mt-5 text-left text-indigo-500">
            <a className="text-sm" href="#">Forgot password?</a>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-5 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>

        {/* Toggle link */}
        <p className="text-gray-500 text-sm mt-4 mb-10">
          {isLogin ? (
            <>
              Don’t have an account?{' '}
              <button type="button" onClick={toggleForm} className="text-indigo-500 hover:underline">
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <button type="button" onClick={toggleForm} className="text-indigo-500 hover:underline">
                Login
              </button>
            </>
          )}
        </p>
      </form>
    </div>
  )
}

export default AuthPage
