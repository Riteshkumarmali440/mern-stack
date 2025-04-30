import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import vegetable from "../assets/vegetable1.jpg";
import fruits from "../assets/fruits.jpg";
import grocery from "../assets/grocery.jpg";
import other from "../assets/other.jpg";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Fresh Vegetables',
      category: 'Groceries',
      price: 25,
      offerPrice: 20,
      rating: 4.5,
      images: [vegetable],
      description: [
        'High-quality fresh vegetables',
        'Great for salads and cooking',
        'Locally sourced',
      ],
    },
    {
      id: 2,
      name: 'Juicy Fruits',
      category: 'Fruits',
      price: 40,
      offerPrice: 35,
      rating: 4.8,
      images: [fruits],
      description: [
        'Sweet and juicy fruits',
        'Perfect for snacking',
        'Organic and fresh',
      ],
    },
    {
      id: 3,
      name: 'Grocery',
      category: 'Grocery',
      price: 60,
      offerPrice: 45,
      rating: 4.8,
      images: [grocery],
      description: [
        'Best Grocery',
        'Perfect',
        'Organic and fresh',
      ],
    },
    {
      id: 4,
      name: 'Other',
      category: 'Other',
      price: 80,
      offerPrice: 65,
      rating: 4.8,
      images: [other],
      description: [
        'Best Milk Products',
        'Perfect',
        'Organic and fresh',
      ],
    },
  ]);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[product.id]) {
        newItems[product.id] += 1; // Increment quantity if the item is already in the cart
      } else {
        newItems[product.id] = 1; // Add the item to the cart if it's not already there
      }
      return newItems;
    });
  };
  

  const handleRemoveFromCart = (product) => {
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      if (newItems[product.id] > 1) {
        newItems[product.id] -= 1; // Decrement quantity if it's greater than 1
      } else {
        delete newItems[product.id]; // Remove the item if quantity is 1
      }
      return newItems;
    });
  };

//   const totalCartItems = useMemo(() => {
//     return cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   }, [cartItems]);

const totalCartItems = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);



  const handleLogin = (username) => {
    setIsLoggedIn(true);
    setUsername(username);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  return (
    <AppContext.Provider
      value={{
        addToCart,
        searchTerm,
        setSearchTerm,
        cartItems,
        totalCartItems,
        handleRemoveFromCart,
        isLoggedIn,
        username,
        showModal,
        setShowModal,
        handleLogin,
        handleLogout,
        products
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
