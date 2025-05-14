import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axiosInstance from "axios";
import axios from 'axios';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartItems, setCartItems] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState(null);
  const [userImage, setUserImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [userEmail, setUserEmail] = useState("");

  const fetchProducts = async () => {
    try {
      console.log(import.meta.env.VITE_BACKEND_URL); // check if URL is loaded

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getproduct/get-products`);


      console.log(res.data); // Log the response to check the structure
      if (Array.isArray(res.data)) {
        setProducts(res.data); // Set the products array if the response is correct
      } else {
        setProducts(res.data.products || []); // In case the response is an object
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };
  

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }

    const storedName = localStorage.getItem("sellerName"); // optional: restore name
  if (storedName) {
    setName(storedName);
  }
  }, []);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  useEffect(() => {
    // Get user info and cart items from localStorage on load
    const storedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems'));

    if (storedUserInfo) {
      setUser(storedUserInfo);
    }
    if (storedCartItems) {
      setCartItems(storedCartItems);
    }
  }, []);

  

  const addToCart = (product) => {
    setCartItems((prev) => {
      const productId = product._id;
      const quantity = prev[productId] || 0;
      return { ...prev, [productId]: quantity + 1 };
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prev) => {
      if (!prev[productId]) return prev;
      const updatedQuantity = prev[productId] - 1;
      const updatedCart = { ...prev };
      if (updatedQuantity > 0) {
        updatedCart[productId] = updatedQuantity;
      } else {
        delete updatedCart[productId];
      }
      return updatedCart;
    });
  };

//   const totalCartItems = useMemo(() => {
//     return cartItems.reduce((acc, item) => acc + item.quantity, 0);
//   }, [cartItems]);

//const totalCartItems = Object.values(cartItems).reduce((total, quantity) => total + quantity, 0);

useEffect(() => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo) {
    setIsLoggedIn(true);
    setName(userInfo.name);
    setUserImage(userInfo.avatar);
  }
}, []);

const loadCartFromStorage = (email) => {
  const storedCart = localStorage.getItem(`cart_${email}`);
  if (storedCart) {
    setCartItems(JSON.parse(storedCart));
  } else {
    setCartItems({});
  }
};

useEffect(() => {
  if (isLoggedIn && userEmail) {
    localStorage.setItem(`cart_${userEmail}`, JSON.stringify(cartItems));
  }
}, [cartItems, isLoggedIn, userEmail]);

useEffect(() => {
  const savedLogin = localStorage.getItem("isLoggedIn");
  const savedEmail = localStorage.getItem("userEmail");
  const savedName = localStorage.getItem("userName");

  if (savedLogin === "true" && savedEmail) {
    setIsLoggedIn(true);
    setUserEmail(savedEmail);
    setName(savedName || "");
    loadCartFromStorage(savedEmail);
  }
}, []);

  const handleLogin = (name, avatar, email) => {
    setIsLoggedIn(true);
    setName(name);
    setUserEmail(email);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userName", name);
    loadCartFromStorage(email);
    
  setUserImage(`${import.meta.env.VITE_BACKEND_URL}/uploads/${avatar}`);
 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName('');
   // setCartItems([]);
   localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userName");
    localStorage.removeItem("userInfo"); 
    localStorage.removeItem(`cart_${userEmail}`);
    setUserEmail("");
    setCartItems({});
  };

  return (
    <AppContext.Provider
      value={{
        addToCart,
        searchTerm,
        setSearchTerm,
        cartItems,
        
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
