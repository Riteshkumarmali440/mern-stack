import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Products from './pages/Products';
import { AppProvider } from './context/AppContext';
import AllProducts from './pages/AllProducts';
import Cart from './pages/Cart';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="bg-slate-900">
        <Nav isLoggedIn={isLoggedIn} username={username} />
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />} />
          <Route path="/product/:id" element={<Products />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/cartItems" element={<Cart/>}/>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
