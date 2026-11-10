import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Cart() {
  const { cart, setCart, user, placeOrder } = useContext(CartContext);
  const navigate = useNavigate();

  const [showPayment, setShowPayment] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [otherApp, setOtherApp] = useState("");
  const [addr, setAddr] = useState(() => {
    return user?.savedAddress || { name: "", door: "", street: "", town: "", city: "", pincode: "", contact: "" };
  });
  const [saveAddress, setSaveAddress] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // ➕ increase qty
  const increaseQty = (index) => {
    const updated = cart.map((item, i) => 
      i === index ? { ...item, quantity: (item.quantity || 1) + 1 } : item
    );
    setCart(updated);
  };

  // ➖ decrease qty
  const decreaseQty = (index) => {
    const updated = cart.map((item, i) => {
      if (i === index && (item.quantity || 1) > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updated);
  };

  // ❌ remove item
  const removeItem = (index) => {
    const updated = cart.filter((_, i) => i !== index);
    setCart(updated);
  };

  // 💰 total
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  // 🛒 handle checkout click
  const handleCheckoutClick = () => {
    if (!user) {
      Swal.fire({ icon: 'warning', title: 'Login Required', text: 'Please Login to place an order!' });
      navigate("/login");
      return;
    }

    if (cart.length === 0) {
      Swal.fire({ icon: 'info', title: 'Cart Empty', text: 'Your cart is empty' });
      return;
    }

    setCheckoutStep(1);
    setShowPayment(true);
  };

  const confirmPayment = () => {
    if (!addr.name.trim() || !addr.door.trim() || !addr.street.trim() || !addr.town.trim() || !addr.pincode.trim()) {
      Swal.fire({ icon: 'error', title: 'Incomplete Address', text: 'Please fill all required delivery address fields!' });
      return;
    }
    
    const finalPaymentMethod = paymentMethod === "other" ? otherApp : paymentMethod;
    if (!finalPaymentMethod) {
      Swal.fire({ icon: 'error', title: 'Payment Method', text: 'Please select a specific payment method.' });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowPayment(false);
      const fullAddress = `${addr.name} \n| ${addr.door}, ${addr.street}, ${addr.town ? addr.town + ", " : ""}${addr.city ? addr.city + " - " : ""}${addr.pincode} | Contact: ${addr.contact || "N/A"}`;
      placeOrder(finalPaymentMethod, fullAddress, saveAddress, addr); // Context handles stock deduction and order saving
      setAddr({ name: "", door: "", street: "", town: "", city: "", pincode: "", contact: "" });
      navigate("/orders");
    }, 2000);
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">Your Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500 mb-4">Your cart is empty</p>
          <button 
            onClick={() => navigate("/")} 
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between mb-4 p-4 border border-gray-100 rounded-lg hover:shadow-sm transition bg-gray-50"
              >
                <div className="flex-1">
                  <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-blue-600 font-medium">₹{item.price}</p>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-md bg-white">
                    <button 
                      onClick={() => decreaseQty(index)}
                      className="px-3 py-1 hover:bg-gray-100 text-gray-600 border-r transition"
                    >-</button>
                    <span className="px-4 font-medium">{item.quantity}</span>
                    <button 
                      onClick={() => increaseQty(index)}
                      className="px-3 py-1 hover:bg-gray-100 text-gray-600 border-l transition"
                    >+</button>
                  </div>

                  <button
                    onClick={() => removeItem(index)}
                    className="p-2 ml-4 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md transition"
                    title="Remove item"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 p-6 border-t flex flex-col sm:flex-row justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
              Total: <span className="text-blue-600">₹{total}</span>
            </h3>

            <button
              onClick={handleCheckoutClick}
              className={`w-full sm:w-auto px-8 py-3 font-bold rounded-lg shadow transition transform hover:-translate-y-0.5 ${user ? "bg-green-600 text-white hover:bg-green-700 hover:shadow-lg" : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg"} `}
            >
              {user ? "Proceed to Payment" : "Login to Checkout"}
            </button>
          </div>
        </div>
      )}

      {/* 🔐 Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4 py-4">
          <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl p-6 md:p-8 relative animate-fade-in-up max-h-[95vh] overflow-y-auto stylish-scrollbar">
            {!isProcessing ? (
              <>
                <button 
                  onClick={() => setShowPayment(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
                >✕</button>
                
                {/* Stepper */}
                <div className="flex items-center justify-center mb-6 mt-2 px-4">
                  <div className="flex items-center w-full max-w-xs">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${checkoutStep >= 1 ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>1</div>
                      <span className={`text-[10px] uppercase tracking-wider mt-1.5 font-bold transition-colors ${checkoutStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>Address</span>
                    </div>
                    <div className={`flex-1 h-1 mx-2 rounded-full transition-colors ${checkoutStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${checkoutStep >= 2 ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-500'}`}>2</div>
                      <span className={`text-[10px] uppercase tracking-wider mt-1.5 font-bold transition-colors ${checkoutStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>Payment</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  {checkoutStep === 1 ? 'Delivery Address' : 'Secure Checkout'}
                </h3>
                
                {checkoutStep === 2 && (
                  <p className="text-gray-500 mb-6 text-center animate-fade-in relative -top-3">Total Amount: <span className="font-bold text-green-600 text-xl">₹{total}</span></p>
                )}

                {checkoutStep === 1 && (
                  <div className="animate-fade-in">
                    <div className="mb-6 bg-gray-50/50 p-4 rounded-xl border border-gray-100">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <label className="block text-xs font-bold text-gray-600 mb-1">Full Name <span className="text-red-500">*</span></label>
                          <input type="text" value={addr.name} onChange={(e) => setAddr({...addr, name: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500" placeholder="Recipient's Name" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-gray-600 mb-1">Door Number <span className="text-red-500">*</span></label>
                          <input type="text" value={addr.door} onChange={(e) => setAddr({...addr, door: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500" placeholder="Flat, House no." />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-gray-600 mb-1">Street Name <span className="text-red-500">*</span></label>
                          <input type="text" value={addr.street} onChange={(e) => setAddr({...addr, street: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500" placeholder="Area, Colony, Street" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-gray-600 mb-1">Town <span className="text-red-500">*</span></label>
                          <input type="text" value={addr.town} onChange={(e) => setAddr({...addr, town: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500" placeholder="Town / Suburb" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-gray-600 mb-1">City</label>
                          <input type="text" value={addr.city} onChange={(e) => setAddr({...addr, city: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500" placeholder="City / District" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-gray-600 mb-1">Pincode <span className="text-red-500">*</span></label>
                          <input type="text" value={addr.pincode} onChange={(e) => setAddr({...addr, pincode: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500" placeholder="Pincode" />
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                          <label className="block text-xs font-bold text-gray-600 mb-1">Contact Number</label>
                          <input type="tel" value={addr.contact} onChange={(e) => setAddr({...addr, contact: e.target.value})} className="w-full border rounded-lg p-2.5 text-sm focus:outline-none focus:border-blue-500" placeholder="Phone Number" />
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center gap-2 border-t pt-3 border-gray-200">
                        <input type="checkbox" id="saveAdd" checked={saveAddress} onChange={() => setSaveAddress(!saveAddress)} className="w-4 h-4 text-blue-600 cursor-pointer" />
                        <label htmlFor="saveAdd" className="text-sm text-gray-600 cursor-pointer select-none">Save this address for future orders</label>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        if (!addr.name.trim() || !addr.door.trim() || !addr.street.trim() || !addr.town.trim() || !addr.pincode.trim()) {
                          Swal.fire({ icon: 'error', title: 'Incomplete Address', text: 'Please fill all required delivery address fields!' });
                          return;
                        }
                        setCheckoutStep(2);
                      }}
                      className="w-full font-bold py-3.5 rounded-xl shadow-lg transition bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/50 hover:-translate-y-0.5"
                    >
                      Continue to Payment ➔
                    </button>
                  </div>
                )}

                {checkoutStep === 2 && (
                  <div className="animate-fade-in">
                    <div className="space-y-3 mb-8">
                      <label className={`block border rounded-xl p-4 cursor-pointer transition ${paymentMethod === "gpay" ? 'border-blue-500 bg-blue-50 shadow-md' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" value="gpay" onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-blue-600" />
                          <span className="font-bold text-gray-700 tracking-wide">Google Pay (GPay)</span>
                        </div>
                      </label>
                      <label className={`block border rounded-xl p-4 cursor-pointer transition ${paymentMethod === "phonepe" ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" value="phonepe" onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-purple-600" />
                          <span className="font-bold text-gray-700 tracking-wide">PhonePe</span>
                        </div>
                      </label>
                      <label className={`block border rounded-xl p-4 cursor-pointer transition ${paymentMethod === "paytm" ? 'border-sky-500 bg-sky-50 shadow-md' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" value="paytm" onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-sky-600" />
                          <span className="font-bold text-gray-700 tracking-wide">Paytm UPI</span>
                        </div>
                      </label>
                      <label className={`block border rounded-xl p-4 cursor-pointer transition ${paymentMethod === "cod" ? 'border-green-500 bg-green-50 shadow-md' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" value="cod" onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-green-600" />
                          <span className="font-bold text-gray-700 tracking-wide">Cash on Delivery (COD)</span>
                        </div>
                      </label>

                      <label className={`block border rounded-xl p-4 cursor-pointer transition ${paymentMethod === "other" ? 'border-orange-500 bg-orange-50 shadow-md' : 'border-gray-200 hover:bg-gray-50'}`}>
                        <div className="flex items-center gap-3">
                          <input type="radio" name="payment" value="other" onChange={(e) => setPaymentMethod(e.target.value)} className="w-5 h-5 text-orange-600" />
                          <span className="font-bold text-gray-700 tracking-wide">Other UPI Apps</span>
                        </div>
                        {paymentMethod === "other" && (
                          <div className="mt-4 pl-8 mb-2 animate-fade-in-up">
                            <select 
                              className="w-full border rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-orange-500 bg-white shadow-sm"
                              value={otherApp}
                              onChange={(e) => setOtherApp(e.target.value)}
                            >
                              <option value="">Select a UPI App...</option>
                              <option value="Amazon Pay UPI">Amazon Pay UPI</option>
                              <option value="WhatsApp Pay">WhatsApp Pay</option>
                              <option value="CRED Pay">CRED P2P UPI</option>
                              <option value="BHIM UPI">BHIM / NPCI</option>
                              <option value="MobiKwik UPI">MobiKwik UPI</option>
                              <option value="Freecharge UPI">Freecharge UPI</option>
                            </select>
                          </div>
                        )}
                      </label>
                    </div>
                    
                    <div className="flex gap-4">
                      <button 
                        onClick={() => setCheckoutStep(1)}
                        className="w-1/3 font-bold py-4 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition"
                      >
                        ← Back
                      </button>
                      <button 
                        onClick={confirmPayment}
                        disabled={(!paymentMethod || (paymentMethod === "other" && !otherApp) || !addr.name.trim() || !addr.door.trim() || !addr.street.trim() || !addr.town.trim() || !addr.pincode.trim())}
                        className={`w-2/3 font-bold py-4 rounded-xl shadow-lg transition ${(paymentMethod && (paymentMethod !== "other" || otherApp) && addr.name.trim() && addr.door.trim() && addr.street.trim() && addr.town.trim() && addr.pincode.trim()) ? 'bg-green-600 text-white hover:bg-green-700 hover:shadow-green-500/50 hover:-translate-y-0.5' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                      >
                        Pay ₹{total} Securely
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-10">
                <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-bold text-gray-800 animate-pulse">Processing Payment...</h3>
                <p className="text-gray-500 mt-2 text-center text-sm">Please do not close this window or press back.</p>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default Cart;