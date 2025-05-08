import { Link } from "react-router-dom";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHome, FiLogOut, FiUser } from "react-icons/fi";
import ekart from "../assets/ekart.jpg"
import { useAppContext } from "../context/AppContext";

const SellerLayout = () => {
  const navigate = useNavigate();
  const {name}=useAppContext();
  const handleLogout = () => {
    localStorage.removeItem("name"); // or your auth session key
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
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col shadow-sm px-7">
        <div className="p-6 border-b border-gray-200">
        <Link to="/home">
            <img
              src={ekart}
              alt="Logo"
              className="h-10 md:h-10 lg:h-10 transition-all transform hover:scale-110 rounded-lg"
            />
          </Link>
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

        {/* Logout Button in Sidebar */}
        <button
          onClick={handleLogout}
          className="flex items-center px-6 py-3 text-red-600 hover:bg-gray-100 border-t border-gray-200"
        >
          <FiLogOut className="mr-3" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-min-screen">
        {/* Header */}
        <header className="flex items-center justify-between bg-white shadow px-6 py-7 border-b border-gray-200">
          <h1 className="text-xl font-semibold text-gray-800">Welcome {name}</h1>

          {/* Profile & Logout in Header */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <FiUser className="text-gray-600 text-2xl" />
            </div>
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
        <main className="flex-1 p-6 bg-gray-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SellerLayout;
