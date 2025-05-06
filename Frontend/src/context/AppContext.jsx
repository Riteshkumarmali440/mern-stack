import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { toast } from 'react-toastify';
import grocery from "../assets/grocery.jpg";
import other from "../assets/other.jpg";
import onion from "../assets/onion.jpg";
import bhendi from "../assets/bhendi.jpg";
import beans from "../assets/beans.jpg";
import bitter from "../assets/bitter.jpg";
import bottle from "../assets/bottle.jpg";
import potato from "../assets/potato1.jpg";
import palak from "../assets/palak.jpg";
import ridge from "../assets/ridge.jpg";
import brinjal from "../assets/brinjal1.jpg";
import apple from "../assets/apple.jpg";
import banana from "../assets/banana.jpg";
import mango from "../assets/mango.jpg";
import poem from "../assets/poem.jpg";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(null);
  const [userImage, setUserImage] = useState(null);

  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Onion',
      category: 'Vegetables',
      price: 25,
      offerPrice: 20,
      rating: 4.5,
      images: [onion],
      description: [
        'High-quality fresh vegetables',
        'Great for salads and cooking',
        'Locally sourced',
      ],
    },
    {
        id: 2,
        name: 'Potato',
        category: 'Vegetables',
        price: 25,
        offerPrice: 20,
        rating: 4.5,
        images: [potato],
        description: [
          'High-quality fresh vegetables',
          'Great for salads and cooking',
          'Locally sourced',
        ],
      },
      {
        id: 3,
        name: 'Bhendi',
        category: 'Vegetables',
        price: 25,
        offerPrice: 20,
        rating: 4.5,
        images: [bhendi],
        description: [
          'High-quality fresh vegetables',
          'Great for salads and cooking',
          'Locally sourced',
        ],
      },
      {
        id: 4,
        name: 'Beans',
        category: 'Vegetables',
        price: 25,
        offerPrice: 20,
        rating: 4.5,
        images: [beans],
        description: [
          'High-quality fresh vegetables',
          'Great for salads and cooking',
          'Locally sourced',
        ],
      },
      {
        id: 5,
        name: 'Bitter Gourd',
        category: 'Vegetables',
        price: 25,
        offerPrice: 20,
        rating: 4.5,
        images: [bitter],
        description: [
          'High-quality fresh vegetables',
          'Great for salads and cooking',
          'Locally sourced',
        ],
      },
      {
        id: 6,
        name: 'Ridge Gourd',
        category: 'Vegetables',
        price: 25,
        offerPrice: 20,
        rating: 4.5,
        images: [ridge],
        description: [
          'High-quality fresh vegetables',
          'Great for salads and cooking',
          'Locally sourced',
        ],
      },
      {
        id: 7,
        name: 'Bottle Gourd',
        category: 'Vegetables',
        price: 25,
        offerPrice: 20,
        rating: 4.5,
        images: [bottle],
        description: [
          'High-quality fresh vegetables',
          'Great for salads and cooking',
          'Locally sourced',
        ],
      },
      {
        id: 8,
        name: 'Brinjal',
        category: 'Vegetables',
        price: 25,
        offerPrice: 20,
        rating: 4.5,
        images: [brinjal],
        description: [
          'High-quality fresh vegetables',
          'Great for salads and cooking',
          'Locally sourced',
        ],
      },
      {
        id: 9,
        name: 'Palak',
        category: 'Vegetables',
        price: 25,
        offerPrice: 20,
        rating: 4.5,
        images: [palak],
        description: [
          'High-quality fresh vegetables',
          'Great for salads and cooking',
          'Locally sourced',
        ],
      },
    {
      id: 10,
      name: 'Mango',
      category: 'Fruits',
      price: 40,
      offerPrice: 35,
      rating: 4.8,
      images: [mango],
      description: [
        'Sweet and juicy fruits',
        'Perfect for snacking',
        'Organic and fresh',
      ],
    },
    {
        id: 11,
        name: 'Banana',
        category: 'Fruits',
        price: 50,
        offerPrice: 35,
        rating: 4.8,
        images: [banana],
        description: [
          'Sweet and juicy fruits',
          'Perfect for snacking',
          'Organic and fresh',
        ],
      },
      {
        id: 12,
        name: 'Apple',
        category: 'Fruits',
        price: 45,
        offerPrice: 35,
        rating: 4.8,
        images: [apple],
        description: [
          'Sweet and juicy fruits',
          'Perfect for snacking',
          'Organic and fresh',
        ],
      },
      {
        id: 13,
        name: 'PoemGranate',
        category: 'Fruits',
        price: 40,
        offerPrice: 35,
        rating: 4.8,
        images: [poem],
        description: [
          'Sweet and juicy fruits',
          'Perfect for snacking',
          'Organic and fresh',
        ],
      },
    {
      id: 14,
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
      id: 15,
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



  const handleLogin = (name, avatar) => {
    setIsLoggedIn(true);
    setName(name);
  setUserImage(`http://localhost:5000/uploads/${avatar}`);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName('');
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
        name,
        showModal,
        setShowModal,
        handleLogin,
        handleLogout,
        products,
        userImage,
        setUserImage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
