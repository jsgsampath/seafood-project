import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

function Navbar() {
  const { cart, user, setUser } = useContext(CartContext);
  const navigate = useNavigate();
  const [showWelcome, setShowWelcome] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowWelcome(false);
      } else {
        setShowWelcome(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const totalItems = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, logout!"
    }).then((result) => {
      if (result.isConfirmed) {
        setUser(null);
        localStorage.removeItem("user");
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "Logged out successfully",
          timer: 1500,
          showConfirmButton: false
        });
        navigate("/login");
      }
    });
  };

  const getNavLinkClass = ({ isActive }) => 
    `font-medium transition-all duration-300 px-3 py-2 rounded-lg ${
      isActive 
        ? "text-blue-700 bg-blue-50 font-bold shadow-sm border border-blue-100" 
        : "text-gray-700 hover:text-blue-600 hover:bg-gray-50"
    }`;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-40 bg-white border-b border-gray-200 flex justify-between items-center px-8 py-4 shadow-sm">
        {/* LEFT */}
        <Link to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition">
          SeaFoodMarket
        </Link>

        {/* RIGHT */}
        <div className="flex items-center gap-6">
        {user?.role !== "admin" && (
          <>
            <NavLink to="/" className={getNavLinkClass}>Home</NavLink>
            <NavLink to="/seafood" className={getNavLinkClass}>Shop Seafood 🐟</NavLink>
            <NavLink to="/seeds" className={getNavLinkClass}>Farming Seeds 🌾</NavLink>
          </>
        )}

        {user && user.role === "admin" && (
          <NavLink to="/admin" className={getNavLinkClass}>Admin Panel ⚙️</NavLink>
        )}

        {user && user.role !== "admin" && (
          <NavLink to="/orders" className={getNavLinkClass}>Orders</NavLink>
        )}

        {user ? (
          <button 
            onClick={handleLogout} 
            className="text-gray-700 hover:text-red-500 font-medium transition-colors duration-300 px-3 py-2 rounded-lg hover:bg-red-50"
          >
            Logout
          </button>
        ) : (
          <NavLink to="/login" className={getNavLinkClass}>Login</NavLink>
        )}

        {user?.role !== "admin" && (
          <Link to="/cart" className="relative text-2xl hover:scale-110 transition-transform block ml-2">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white rounded-full px-2 py-0.5 text-[10px] font-bold shadow-sm">
                {totalItems}
              </span>
            )}
          </Link>
        )}
        </div>
      </nav>

      {/* Floating Welcome Message */}
      {user && (
        <div className={`fixed top-24 right-6 z-40 bg-white shadow-xl rounded-lg px-6 py-3 border-l-4 border-blue-500 flex items-center gap-3 transition-all duration-500 transform ${showWelcome ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0'}`}>
          <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-sm shadow-green-200"></div>
          <span className="text-gray-800 font-semibold tracking-wide">
            Welcome back, <span className="text-blue-600">{user.role === "admin" ? "Admin" : user.email.split('@')[0].charAt(0).toUpperCase() + user.email.split('@')[0].slice(1)}</span>!
          </span>
        </div>
      )}
    </>
  );
}

export default Navbar;