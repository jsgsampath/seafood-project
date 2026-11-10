import React from "react";
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Products from "./components/Products";
import FishSeeds from "./components/FishSeeds";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router> {/* ✅ FIRST */}
      <CartProvider>

        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/seafood" element={<Products />} />
          <Route path="/seeds" element={<FishSeeds />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} /> {/* ✅ Capital */}
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>

      </CartProvider>
    </Router>
  );
}

export default App;