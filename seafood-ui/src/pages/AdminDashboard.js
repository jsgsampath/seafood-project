import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

function AdminDashboard() {
  const { user, products, setProducts, seeds, setSeeds, orders, setOrders, updateOrderStatus } = useContext(CartContext);
  const [activeTab, setActiveTab] = useState("overview");

  // New Product Form State
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newStock, setNewStock] = useState("");
  const [newCategory, setNewCategory] = useState("seafood");
  const [newImage, setNewImage] = useState("");
  const [newDesc, setNewDesc] = useState("");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!user || user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // Analytics
  const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  const totalOrders = orders.length;
  const totalItems = products.length + seeds.length;

  // Handlers
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newName || !newPrice) {
      Swal.fire({ icon: 'warning', title: 'Missing Information', text: "Name and price are required!" });
      return;
    }

    let descriptionText = "";
    let extractedHighlights = [];

    if (newDesc.trim()) {
      const lines = newDesc.split('\n');
      lines.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
          extractedHighlights.push(trimmed.substring(1).trim());
        } else if (trimmed !== "") {
          descriptionText += (descriptionText ? '\n' : '') + trimmed;
        }
      });
    }

    const newItem = {
      id: Date.now(),
      name: newName,
      price: Number(newPrice),
      stock: Number(newStock) || 0,
      image: newImage || "https://via.placeholder.com/150", 
      description: descriptionText || undefined,
      highlights: extractedHighlights.length > 0 ? extractedHighlights : undefined
    };

    if (newCategory === "seafood") {
      setProducts([...products, newItem]);
    } else {
      setSeeds([...seeds, newItem]);
    }

    setNewName("");
    setNewPrice("");
    setNewStock("");
    setNewImage("");
    setNewDesc("");
    Swal.fire({ icon: 'success', title: 'Added Successfully', text: `${newName} added successfully! ✅`, timer: 1500, showConfirmButton: false });
  };

  const handleRemoveProduct = (id, category) => {
    if (category === "seafood") {
      setProducts(products.filter((p) => p.id !== id));
    } else {
      setSeeds(seeds.filter((s) => s.id !== id));
    }
  };

  const handleEditPrice = (id, category, currentPrice) => {
    Swal.fire({
      title: 'Enter new price (₹)',
      input: 'number',
      inputValue: currentPrice,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || Number(value) <= 0) {
          return 'Please enter a valid price greater than 0'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const parsedPrice = Number(result.value);
        if (category === "seafood") {
          setProducts(products.map(p => p.id === id ? { ...p, price: parsedPrice } : p));
        } else {
          setSeeds(seeds.map(s => s.id === id ? { ...s, price: parsedPrice } : s));
        }
        Swal.fire({ icon: 'success', title: 'Price Updated', timer: 1000, showConfirmButton: false });
      }
    });
  };

  const handleEditStock = (id, category, currentStock) => {
    Swal.fire({
      title: 'Enter new stock level',
      input: 'number',
      inputValue: currentStock,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || Number(value) < 0) {
          return 'Please enter a valid stock number'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const parsedStock = Number(result.value);
        if (category === "seafood") {
          setProducts(products.map(p => p.id === id ? { ...p, stock: parsedStock } : p));
        } else {
          setSeeds(seeds.map(s => s.id === id ? { ...s, stock: parsedStock } : s));
        }
        Swal.fire({ icon: 'success', title: 'Stock Updated', timer: 1000, showConfirmButton: false });
      }
    });
  };

  const handleEditDiscount = (id, category, currentDiscount) => {
    Swal.fire({
      title: 'Discount Percentage (%)',
      input: 'number',
      inputLabel: 'Enter 0 to remove discount',
      inputValue: currentDiscount || 0,
      showCancelButton: true,
      inputValidator: (value) => {
        if (value === '' || Number(value) < 0 || Number(value) > 100) {
          return 'Enter a valid percentage between 0 and 100';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const parsedDiscount = Number(result.value);
        if (category === "seafood") {
          setProducts(products.map(p => p.id === id ? { ...p, discount: parsedDiscount } : p));
        } else {
          setSeeds(seeds.map(s => s.id === id ? { ...s, discount: parsedDiscount } : s));
        }
        Swal.fire({ icon: 'success', title: 'Discount Updated', timer: 1000, showConfirmButton: false });
      }
    });
  };

  const handleEditPacketSize = (id, currentSize) => {
    Swal.fire({
      title: 'Quantity Per Packet',
      input: 'text',
      inputLabel: "e.g., '1000 seeds', '5000 PL'",
      inputValue: currentSize || "1000 seeds",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value || value.trim() === "") {
          return 'You must enter a value!'
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setSeeds(seeds.map(s => s.id === id ? { ...s, packetSize: result.value.trim() } : s));
        Swal.fire({ icon: 'success', title: 'Packet Size Updated', timer: 1000, showConfirmButton: false });
      }
    });
  };

  const handleCancelOrder = (orderId) => {
    Swal.fire({
      title: 'Delete this order?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        setOrders(orders.filter((o) => o.id !== orderId));
        Swal.fire({ icon: 'success', title: 'Deleted!', text: 'Order has been deleted.', timer: 1500, showConfirmButton: false });
      }
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen pt-[76px] flex">
      {/* SIDEBAR */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 shadow-2xl fixed left-0 top-[76px] h-[calc(100vh-76px)] overflow-y-auto flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold tracking-widest text-blue-400 mb-8 border-b border-gray-700 pb-4">
            ADMIN PANEL
          </h2>
          <div className="flex flex-col gap-2">
            <button 
              onClick={() => setActiveTab("overview")}
              className={`text-left px-4 py-3 rounded-lg font-medium transition flex items-center gap-3 ${activeTab === "overview" ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
            >
              <span>📊</span> Overview
            </button>
            <button 
              onClick={() => setActiveTab("products")}
              className={`text-left px-4 py-3 rounded-lg font-medium transition flex items-center gap-3 ${activeTab === "products" ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
            >
              <span>📦</span> Products & Seeds
            </button>
            <button 
              onClick={() => setActiveTab("orders")}
              className={`text-left px-4 py-3 rounded-lg font-medium transition flex items-center gap-3 ${activeTab === "orders" ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
            >
              <span>🚚</span> Orders
            </button>
            <button 
              onClick={() => setActiveTab("stock")}
              className={`text-left px-4 py-3 rounded-lg font-medium transition flex items-center gap-3 ${activeTab === "stock" ? "bg-blue-600 text-white shadow-md" : "text-gray-300 hover:bg-gray-800 hover:text-white"}`}
            >
              <span>📉</span> Inventory Tracking
            </button>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 ml-64 p-8 bg-gray-50 border-t border-gray-200">
        <div className="max-w-6xl mx-auto">
          
          {/* TAB: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-2xl shadow-lg text-white">
                  <p className="text-green-50 font-medium mb-1">Total Revenue</p>
                  <h4 className="text-4xl font-bold">₹{totalRevenue}</h4>
                </div>
                <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-2xl shadow-lg text-white">
                  <p className="text-blue-50 font-medium mb-1">Total Orders</p>
                  <h4 className="text-4xl font-bold">{totalOrders}</h4>
                </div>
                <div className="bg-gradient-to-br from-purple-400 to-purple-600 p-6 rounded-2xl shadow-lg text-white">
                  <p className="text-purple-50 font-medium mb-1">Active Products</p>
                  <h4 className="text-4xl font-bold">{totalItems}</h4>
                </div>
              </div>
            </div>
          )}

          {/* TAB: PRODUCTS */}
          {activeTab === "products" && (
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Manage Products</h3>
              
              {/* ADD NEW PRODUCT FORM */}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
                <h4 className="text-lg font-bold text-gray-700 mb-4">＋ Add New Item</h4>
                <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                  <input type="text" placeholder="Product Name" className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400" value={newName} onChange={(e) => setNewName(e.target.value)} required />
                  <input type="number" placeholder="Price (₹)" className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
                  <input type="number" placeholder="Initial Stock" className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400" value={newStock} onChange={(e) => setNewStock(e.target.value)} required />
                  
                  <textarea placeholder="Description (lines starting with '-' will become Plus Points)" className="md:col-span-2 lg:col-span-3 p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400" value={newDesc} onChange={(e) => setNewDesc(e.target.value)} rows="3"></textarea>
                  
                  <div className="flex flex-col gap-2">
                    <input type="text" placeholder="Image URL or upload file" className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400" value={newImage} onChange={(e) => setNewImage(e.target.value)} />
                    <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-gray-500 file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                  </div>

                  <select className="p-3 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-blue-400 bg-white" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                    <option value="seafood">Seafood 🐟</option>
                    <option value="seeds">Farming Seeds 🌾</option>
                  </select>
                  <button className="md:col-span-2 lg:col-span-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow-md transition transform hover:-translate-y-0.5 self-end">Add Product</button>
                  
                  {newImage && (
                    <div className="md:col-span-2 lg:col-span-3">
                      <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
                      <img src={newImage} alt="Preview" className="h-24 w-24 object-cover rounded shadow border border-gray-200" />
                    </div>
                  )}
                </form>
              </div>

              {/* LIST PRODUCTS */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-bold text-gray-700 mb-4 border-b pb-2">Seafood Inventory ({products.length})</h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {products.map((p) => (
                      <div key={p.id} className="flex justify-between items-center p-3 bg-white border border-gray-100 shadow-sm rounded-lg hover:shadow-md transition">
                        <div className="flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-12 h-12 rounded object-contain bg-white" />
                          <div>
                            <p className="font-bold text-gray-800">
                              {p.name}
                              {p.discount > 0 && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">-{p.discount}%</span>}
                            </p>
                            <p className="text-sm font-medium">
                              <span className="text-green-600">₹{p.price}</span> 
                              <span className="mx-2 text-gray-300">|</span> 
                              <span className={p.stock > 0 ? "text-gray-500" : "text-red-500 font-bold"}>
                                Stock: {p.stock}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2 mt-2 sm:mt-0 items-center">
                          {p.stock > 0 ? (
                            <button onClick={() => setProducts(products.map(x => x.id === p.id ? { ...x, stock: 0 } : x))} className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded text-xs transition border border-transparent hover:border-gray-300">Out of Stock</button>
                          ) : (
                            <button onClick={() => handleEditStock(p.id, "seafood", p.stock)} className="text-green-600 hover:bg-green-50 px-2 py-1 rounded text-xs font-bold transition border border-transparent hover:border-green-200">In Stock (OK)</button>
                          )}
                          <button onClick={() => handleEditPrice(p.id, "seafood", p.price)} className="text-blue-500 hover:bg-blue-50 px-2 py-1 rounded text-xs transition border border-transparent hover:border-blue-200">Price</button>
                          <button onClick={() => handleEditDiscount(p.id, "seafood", p.discount)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded text-xs transition border border-transparent hover:border-red-200">Discount</button>
                          <button onClick={() => handleEditStock(p.id, "seafood", p.stock)} className="text-orange-500 hover:bg-orange-50 px-2 py-1 rounded text-xs transition border border-transparent hover:border-orange-200">Stock</button>
                          <button onClick={() => handleRemoveProduct(p.id, "seafood")} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded text-xs transition border border-transparent hover:border-red-200">✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-gray-700 mb-4 border-b pb-2">Seeds Inventory ({seeds.length})</h4>
                  <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                    {seeds.map((s) => (
                      <div key={s.id} className="flex justify-between items-center p-3 bg-white border border-gray-100 shadow-sm rounded-lg hover:shadow-md transition">
                        <div className="flex items-center gap-3">
                          <img src={s.image} alt={s.name} className="w-12 h-12 rounded object-contain bg-white" />
                          <div>
                            <p className="font-bold text-gray-800">
                              {s.name}
                              {s.discount > 0 && <span className="ml-2 text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full uppercase font-bold tracking-wider">-{s.discount}%</span>}
                            </p>
                            <p className="text-sm font-medium">
                              <span className="text-green-600">₹{s.price}</span> 
                              <span className="mx-2 text-gray-300">|</span> 
                              <span className={s.stock > 0 ? "text-gray-500" : "text-red-500 font-bold"}>
                                Stock: {s.stock}
                              </span>
                              <span className="mx-2 text-gray-300">|</span> 
                              <span className="text-purple-600 text-xs font-bold">
                                {s.packetSize || "1000 seeds"}
                              </span>
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col gap-1 sm:flex-row sm:gap-2 mt-2 sm:mt-0 items-center">
                          {s.stock > 0 ? (
                            <button onClick={() => setSeeds(seeds.map(x => x.id === s.id ? { ...x, stock: 0 } : x))} className="text-gray-500 hover:bg-gray-100 px-2 py-1 rounded text-xs transition border border-transparent hover:border-gray-300">Out of Stock</button>
                          ) : (
                            <button onClick={() => handleEditStock(s.id, "seeds", s.stock)} className="text-green-600 hover:bg-green-50 px-2 py-1 rounded text-xs font-bold transition border border-transparent hover:border-green-200">In Stock (OK)</button>
                          )}
                          <button onClick={() => handleEditPrice(s.id, "seeds", s.price)} className="text-blue-500 hover:bg-blue-50 px-2 py-1 rounded text-xs transition border border-transparent hover:border-blue-200">Price</button>
                          <button onClick={() => handleEditDiscount(s.id, "seeds", s.discount)} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded text-xs transition border border-transparent hover:border-red-200">Discount</button>
                          <button onClick={() => handleEditStock(s.id, "seeds", s.stock)} className="text-orange-500 hover:bg-orange-50 px-2 py-1 rounded text-xs transition border border-transparent hover:border-orange-200">Stock</button>
                          <button onClick={() => handleEditPacketSize(s.id, s.packetSize)} className="text-purple-500 hover:bg-purple-50 px-2 py-1 rounded text-xs transition border border-transparent hover:border-purple-200">Qty/Pkt</button>
                          <button onClick={() => handleRemoveProduct(s.id, "seeds")} className="text-red-500 hover:bg-red-50 px-2 py-1 rounded text-xs transition border border-transparent hover:border-red-200">✕</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* TAB: ORDERS */}
          {activeTab === "orders" && (
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Order Management</h3>
              {orders.length === 0 ? (
                <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center">
                  <p className="text-gray-500 py-8">No orders placed yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto bg-white rounded-xl shadow-lg border border-gray-100 p-1">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-200">
                        <th className="p-4 font-semibold rounded-tl-lg">Order Info</th>
                        <th className="p-4 font-semibold">Customer</th>
                        <th className="p-4 font-semibold text-center">Payment</th>
                        <th className="p-4 font-semibold">Ordered Items</th>
                        <th className="p-4 font-semibold text-right">Total</th>
                        <th className="p-4 font-semibold text-center">Status</th>
                        <th className="p-4 font-semibold text-center rounded-tr-lg">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {orders.map((o) => (
                        <tr key={o.id} className="hover:bg-gray-50 transition border-b border-gray-100">
                          <td className="p-4">
                            <p className="text-sm font-bold text-gray-800">#{o.id}</p>
                            <p className="text-xs text-gray-500 mt-1">{o.date}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm font-bold text-gray-700">{o.customerName || "Legacy User"}</p>
                            <p className="text-xs text-gray-500 mb-2">{o.customerEmail || "N/A"}</p>
                            <div className="text-xs text-gray-700 bg-orange-50 border border-orange-100 p-2 rounded-md min-w-[150px] max-w-[200px] break-words shadow-sm">
                                <span className="font-bold text-orange-800 block mb-1">📍 Address:</span>
                                {o.deliveryAddress || "No address provided"}
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <span className="bg-blue-100 text-blue-700 font-bold px-3 py-1.5 rounded-full text-[10px] uppercase tracking-wider whitespace-nowrap shadow-sm border border-blue-200">{o.payment || "N/A"}</span>
                          </td>
                          <td className="p-4 text-sm text-gray-600">
                            <div className="flex flex-col gap-1 max-h-28 overflow-y-auto pr-2">
                              {o.items?.map((item, i) => (
                                <div key={i} className="flex justify-between items-center text-xs bg-gray-50 p-1.5 rounded border border-gray-100 shadow-sm">
                                  <span className="font-medium truncate max-w-[120px] lg:max-w-[180px]">{item.name}</span>
                                  <span className="text-gray-500 font-bold bg-gray-200 px-1.5 py-0.5 rounded-sm ml-2">x{item.quantity || 1}</span>
                                </div>
                              ))}
                            </div>
                          </td>
                          <td className="p-4 text-right font-bold text-green-600 text-lg">₹{o.total}</td>
                          <td className="p-4 text-center">
                            <select 
                              value={o.status || "Pending"} 
                              onChange={(e) => updateOrderStatus(o.id, e.target.value)}
                              className={`text-xs font-bold px-2 py-1.5 rounded outline-none cursor-pointer border shadow-sm ${o.status === 'Delivered' ? 'bg-green-100 text-green-700 border-green-200' : o.status === 'Processing' ? 'bg-blue-100 text-blue-700 border-blue-200' : o.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-700 border-purple-200' : o.status === 'Cancelled' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}
                            >
                              <option value="Pending" className="bg-white text-black">Pending</option>
                              <option value="Processing" className="bg-white text-black">Processing</option>
                              <option value="Out for Delivery" className="bg-white text-black">Out for Delivery</option>
                              <option value="Delivered" className="bg-white text-black">Delivered</option>
                              <option value="Cancelled" className="bg-white text-black">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-4 text-center">
                            <button 
                              onClick={() => handleCancelOrder(o.id)}
                              className="text-red-500 hover:bg-red-50 px-3 py-1 rounded text-sm transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB: STOCK TRACKING */}
          {activeTab === "stock" && (
            <div className="animate-fade-in-up">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Inventory Tracking</h3>
              <div className="grid grid-cols-1 gap-6">
                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
                  <h4 className="font-bold text-blue-600 mb-4 border-b pb-2 text-lg">Seafood Stock</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {products.map(p => (
                      <div key={p.id} className="p-4 border border-gray-100 rounded-lg shadow-sm flex justify-between items-center bg-gray-50">
                        <span className="font-medium text-gray-700 truncate mr-2" title={p.name}>{p.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold px-3 py-1 rounded-full text-xs whitespace-nowrap ${p.stock > 10 ? 'bg-green-100 text-green-700' : p.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {p.stock} left
                          </span>
                          <button onClick={() => handleEditStock(p.id, "seafood", p.stock)} className="text-gray-400 hover:text-blue-600 transition" title="Edit Stock">✏️</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 mt-4">
                  <h4 className="font-bold text-orange-600 mb-4 border-b pb-2 text-lg">Seed Stock</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {seeds.map(s => (
                      <div key={s.id} className="p-4 border border-gray-100 rounded-lg shadow-sm flex justify-between items-center bg-gray-50">
                        <span className="font-medium text-gray-700 truncate mr-2" title={s.name}>{s.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={`font-bold px-3 py-1 rounded-full text-xs whitespace-nowrap ${s.stock > 10 ? 'bg-green-100 text-green-700' : s.stock > 0 ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                            {s.stock} left
                          </span>
                          <button onClick={() => handleEditStock(s.id, "seeds", s.stock)} className="text-gray-400 hover:text-blue-600 transition" title="Edit Stock">✏️</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
