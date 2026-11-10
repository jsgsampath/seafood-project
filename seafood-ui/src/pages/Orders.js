import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Orders() {
  const { orders, setOrders, submitReview, user, updateOrderAddress } = useContext(CartContext);
  const navigate = useNavigate();

  const handleWriteReview = (item) => {
    Swal.fire({
      title: `Review ${item.name}`,
      html: `
        <style>
          .star-rating {
            direction: rtl;
            display: inline-block;
            padding: 10px 0;
          }
          .star-rating input[type=radio] {
            display: none;
          }
          .star-rating label {
            color: #ddd;
            font-size: 40px;
            padding: 0 4px;
            cursor: pointer;
            transition: all 0.2s;
          }
          .star-rating label:hover,
          .star-rating label:hover ~ label,
          .star-rating input[type=radio]:checked ~ label {
            color: #ffc700;
          }
        </style>
        <div style="text-align: center;">
          <p style="margin-bottom: 0px; color: #555; font-weight: bold; font-size: 16px;">Select Rating (out of 5)</p>
          <div class="star-rating" onmouseout="
              const checked = document.querySelector('input[name=rating]:checked');
              const textDiv = document.getElementById('rating-text');
              if(checked) {
                 textDiv.innerText = document.querySelector('label[for=' + checked.id + ']').title;
              } else {
                 textDiv.innerText = '';
              }
            ">
            <input type="radio" id="star5" name="rating" value="5" onclick="document.getElementById('rating-text').innerText='Excellent'" /><label for="star5" title="Excellent" onmouseover="document.getElementById('rating-text').innerText='Excellent'">&#9733;</label>
            <input type="radio" id="star4" name="rating" value="4" onclick="document.getElementById('rating-text').innerText='Good'" /><label for="star4" title="Good" onmouseover="document.getElementById('rating-text').innerText='Good'">&#9733;</label>
            <input type="radio" id="star3" name="rating" value="3" onclick="document.getElementById('rating-text').innerText='Average'" /><label for="star3" title="Average" onmouseover="document.getElementById('rating-text').innerText='Average'">&#9733;</label>
            <input type="radio" id="star2" name="rating" value="2" onclick="document.getElementById('rating-text').innerText='Poor'" /><label for="star2" title="Poor" onmouseover="document.getElementById('rating-text').innerText='Poor'">&#9733;</label>
            <input type="radio" id="star1" name="rating" value="1" onclick="document.getElementById('rating-text').innerText='Bad'" /><label for="star1" title="Bad" onmouseover="document.getElementById('rating-text').innerText='Bad'">&#9733;</label>
          </div>
          <div id="rating-text" style="height: 20px; color: #000; font-weight: bold; font-size: 14px; margin-top: -5px; transition: all 0.2s;"></div>
        </div>
        <textarea id="swal-comment" class="swal2-textarea" placeholder="Please write about the quality, freshness, and delivery..." style="margin-top: 5px; height: 100px;"></textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Publish Review',
      preConfirm: () => {
        const ratingInput = document.querySelector('input[name="rating"]:checked');
        const r = ratingInput ? ratingInput.value : null;
        const c = document.getElementById('swal-comment').value;
        if (!r) {
          Swal.showValidationMessage('Please select a star rating out of 5');
          return false;
        }
        if (!c.trim()) {
          Swal.showValidationMessage('Please write a review comment');
          return false;
        }
        return { rating: Number(r), comment: c.trim() };
      }
    }).then((result) => {
      if (result.isConfirmed) {
         submitReview(item.id, item.name, item.packetSize ? "seeds" : "seafood", user, result.value.rating, result.value.comment);
         Swal.fire({ icon: 'success', title: 'Review Published!', text: 'Thank you for your valuable feedback. Your verified review is now live.', timer: 2000, showConfirmButton: false });
      }
    });
  };

  const handleEditAddress = (order) => {
    Swal.fire({
      title: 'Edit Delivery Address',
      input: 'textarea',
      inputLabel: 'Update your address details below',
      inputValue: order.deliveryAddress,
      inputPlaceholder: 'Enter your new delivery address...',
      inputAttributes: {
        'aria-label': 'Type your new delivery address here'
      },
      showCancelButton: true,
      confirmButtonText: 'Save New Address',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      inputValidator: (value) => {
        if (!value.trim()) {
          return 'Address cannot be empty!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        updateOrderAddress(order.id, result.value);
        Swal.fire({
          title: 'Address Updated!',
          text: 'Your delivery address has been successfully updated.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false
        });
      }
    });
  };

  const handleCancelOrder = (orderIndex) => {
    Swal.fire({
      title: "Cancel Order?",
      text: "Are you sure you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, cancel it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedOrders = orders.filter((_, index) => index !== orderIndex);
        setOrders(updatedOrders);
        Swal.fire({ title: "Cancelled!", text: "Order has been cancelled.", icon: "success", timer: 1500, showConfirmButton: false});
      }
    });
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <h2 className="text-3xl font-bold text-gray-800">📦 Your Orders</h2>
        {orders.length > 0 && (
          <button
            onClick={() => setOrders([])}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md shadow transition"
          >
            Clear Orders
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-xl text-gray-500 mb-4">No orders yet 😢</p>
          <button 
            onClick={() => navigate("/")} 
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => {
            const items = order.items || order;

            return (
              <div
                key={index}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
              >
                <div className="bg-gray-50 p-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800">Order #{index + 1}</h4>
                    {order.date && <p className="text-sm text-gray-500 mb-2">🕒 {order.date}</p>}
                    <div className="flex gap-2.5">
                      {order.payment && <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wide shadow-sm border border-blue-200">{order.payment}</span>}
                      <span className={`inline-block text-xs px-2.5 py-1 rounded font-bold uppercase tracking-wide shadow-sm border ${order.status === 'Delivered' ? 'bg-green-100 text-green-700 border-green-200' : order.status === 'Processing' ? 'bg-sky-100 text-sky-700 border-sky-200' : order.status === 'Out for Delivery' ? 'bg-purple-100 text-purple-700 border-purple-200' : order.status === 'Cancelled' ? 'bg-red-100 text-red-700 border-red-200' : 'bg-orange-100 text-orange-700 border-orange-200 animate-pulse'}`}>
                        {order.status || 'Pending'}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex flex-col items-end gap-2">
                    {order.total && (
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Total</p>
                        <h4 className="text-xl font-bold text-green-600">₹{order.total}</h4>
                      </div>
                    )}
                    <button
                      onClick={() => handleCancelOrder(index)}
                      className="px-3 py-1 bg-red-100 text-red-600 font-medium text-sm rounded hover:bg-red-200 transition"
                    >
                      Cancel Order
                    </button>
                  </div>
                </div>

                <div className="px-4 py-3 bg-white border-b border-gray-100 flex justify-between items-start">
                  <div className="flex-1 mr-4">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-1 flex items-center gap-1">📍 Delivery Address</p>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{order.deliveryAddress || "Address not provided."}</p>
                  </div>
                  {(order.status !== 'Delivered' && order.status !== 'Cancelled') && (
                    <button 
                      onClick={() => handleEditAddress(order)}
                      className="whitespace-nowrap px-3 py-1.5 bg-blue-50 text-blue-600 font-bold text-xs rounded-md border border-blue-200 hover:bg-blue-100 hover:shadow-sm transition-all"
                    >
                      ✏️ Edit Address
                    </button>
                  )}
                </div>

                <div className="p-4">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="text-gray-500 text-sm border-b">
                        <th className="pb-2">Item</th>
                        <th className="pb-2 text-center">Qty</th>
                        <th className="pb-2 text-right">Price</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {items.map((item, i) => (
                        <tr key={i} className="text-gray-800 hover:bg-gray-50 transition border-b border-gray-50 last:border-0">
                          <td className="py-3 px-2 font-medium">
                            {item.name}
                            <div className="mt-1">
                              <button onClick={() => handleWriteReview(item)} className="text-xs font-bold text-blue-600 hover:text-blue-800 underline flex items-center gap-1">
                                <span>★</span> Write Review
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-2 text-center">{item.quantity || 1}</td>
                          <td className="py-3 px-2 text-right font-semibold">₹{item.price}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Orders;