import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Products from './pages/Products';
import { AppProvider } from './context/AppContext';
import AllProducts from './pages/AllProducts';
import Cart from './pages/Cart';
import Payment from './pages/Payment';
import MyOrder from './pages/MyOrder';
import SellerLogin from './components/SellerLogin';
import SellerLayout from './components/SellerLayout';
import AddProduct from './pages/AddProduct';
import SellerDashboard from './pages/SellerDashboard';
import ProductList from './pages/ProductList';

function AppContent() {
  const location = useLocation();
  const isSellerRoute = location.pathname.startsWith('/seller');

  return (
    <>
      {!isSellerRoute && (
        <div className="bg-slate-900">
          <Nav />
        </div>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/aboutus" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/:id" element={<Products />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/cartItems" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/myorder" element={<MyOrder />} />

        {/* Seller Login */}
        <Route path="/seller/login" element={<SellerLogin />} />

        {/* Seller Layout with nested routes */}
        <Route path="/seller" element={<SellerLayout />}>
          <Route path="addproduct" element={<AddProduct/>} />
          <Route path="dashboard" element={<SellerDashboard/>} />
          <Route path="productlist" element={<ProductList/>} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
