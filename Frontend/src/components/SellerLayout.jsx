import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHome, FiLogOut, FiUser, FiMenu } from "react-icons/fi";
import ekart from "../assets/ekart.jpg";
import { useAppContext } from "../context/AppContext";
import { useState } from "react";

const SellerLayout = () => {
  const navigate = useNavigate();
  const { name } = useAppContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("name");
    navigate("/seller/login");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 relative ${
      isActive ? "bg-gray-100 font-semibold text-indigo-600" : ""
    }`;

  const activeIndicator = ({ isActive }) =>
    isActive
      ? "absolute left-0 top-0 h-full w-1 bg-indigo-600 rounded-tr rounded-br"
      : "";

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`fixed z-30 inset-y-0 left-0 w-64 bg-white border-r border-gray-200 flex flex-col shadow-sm transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        md:relative md:translate-x-0 md:flex`}
      >
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <Link to="/home">
            <img
              src={ekart}
              alt="Logo"
              className="h-10 transition-all transform hover:scale-110 rounded-lg"
            />
          </Link>
          {/* Close button for mobile */}
          <button
            className="md:hidden text-gray-600"
            onClick={() => setSidebarOpen(false)}
          >
            ✖
          </button>
        </div>

        <nav className="flex-1 space-y-1 mt-4">
          <NavLink to="/seller/dashboard" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <span className={activeIndicator({ isActive })}></span>
                <FiHome className="mr-3" />
                Dashboard
              </>
            )}
          </NavLink>

          <NavLink to="/seller/addproduct" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <span className={activeIndicator({ isActive })}></span>
                <FiShoppingCart className="mr-3" />
                Add Product
              </>
            )}
          </NavLink>

          <NavLink to="/seller/productlist" className={navLinkClass}>
            {({ isActive }) => (
              <>
                <span className={activeIndicator({ isActive })}></span>
                <FiShoppingCart className="mr-3" />
                Product List
              </>
            )}
          </NavLink>
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 text-red-600 hover:bg-gray-100 border-t border-gray-200"
        >
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-screen overflow-auto">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-4 py-5 border-b border-gray-200">
          {/* Hamburger for mobile */}
          <button
            className="md:hidden text-gray-600 text-2xl"
            onClick={() => setSidebarOpen(true)}
          >
            <FiMenu />
          </button>

          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            Welcome {name}
          </h1>

          <div className="flex items-center space-x-6">
            <FiUser className="text-gray-600 text-2xl" />
            <button
              onClick={handleLogout}
              className="flex items-center text-red-600 hover:text-red-800"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 bg-gray-50 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
