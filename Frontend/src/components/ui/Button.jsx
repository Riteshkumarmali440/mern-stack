import React from 'react'

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`px-4 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
