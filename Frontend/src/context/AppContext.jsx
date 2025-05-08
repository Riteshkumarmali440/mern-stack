import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import axiosInstance from "axios";


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
 
  // const fetchProducts = async () => {
  //   try {
  //     const res = await axios.get('http://localhost:5000/api/getproduct/get-products');
  //     setProducts(res.data);
  //   } catch (error) {
  //     console.error('Failed to fetch products:', error);
  //   }
  // };

  const fetchProducts = async () => {
    try {
      const res = await axiosInstance.get('http://localhost:5000/api/getproduct/get-products');
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
  localStorage.setItem("name", name); 
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setName('');
    localStorage.removeItem("name");
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
