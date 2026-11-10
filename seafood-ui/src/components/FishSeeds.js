import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import Swal from "sweetalert2";

function FishSeeds() {
  const { addToCart, seeds, submitReview, user } = useContext(CartContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoriesMenu, setShowCategoriesMenu] = useState(false);

  const categoryGroups = [
    {
      title: "By Water Compatibility",
      options: ["Freshwater Setup", "Brackish Water Setup", "Pond & Lake Ideal", "Marine Setup"]
    },
    {
      title: "By Farming Goals",
      options: ["Fast Growth (Less Time)", "High Profit Yield", "Easy to Maintain", "High Demand Market"]
    },
    {
      title: "By Species Category",
      options: ["Carps Family", "Shrimps & Prawns", "Catfish & Murrels", "Exotic/Other", "Crabs & Lobsters"]
    }
  ];

  const categoryMapping = {
    // Water Compatibility
    "Freshwater Setup": ["Rohu Seeds", "Catla Seeds", "Tilapia Seeds", "Pangasius Seeds", "Murrel Seeds", "Carp Seeds", "Catfish Seeds", "Mahseer Seeds", "Silver Carp Seeds", "Grass Carp Seeds", "Common Carp Seeds", "Pearl Spot (Karimeen) Seeds"],
    "Brackish Water Setup": ["Prawn Post Larvae", "Shrimp Seeds", "Sea Bass (Bhetki) Seeds", "Mud Crab Instars", "Tiger Prawn PLs", "Milkfish (Chanos) Seeds"],
    "Pond & Lake Ideal": ["Rohu Seeds", "Catla Seeds", "Carp Seeds", "Tilapia Seeds", "Silver Carp Seeds", "Grass Carp Seeds", "Common Carp Seeds"],
    "Marine Setup": ["Mangrove Snapper Seeds", "Sea Bass (Bhetki) Seeds"],
    
    // Farming Goals
    "Fast Growth (Less Time)": ["Catla Seeds", "Pangasius Seeds", "Tilapia Seeds", "Carp Seeds", "Silver Carp Seeds", "Grass Carp Seeds", "Common Carp Seeds"],
    "High Profit Yield": ["Prawn Post Larvae", "Shrimp Seeds", "Murrel Seeds", "Catfish Seeds", "Mahseer Seeds", "Sea Bass (Bhetki) Seeds", "Tiger Prawn PLs", "Scampi Larvae"],
    "Easy to Maintain": ["Tilapia Seeds", "Pangasius Seeds", "Rohu Seeds", "Catla Seeds", "Common Carp Seeds", "Milkfish (Chanos) Seeds"],
    "High Demand Market": ["Sea Bass (Bhetki) Seeds", "Pearl Spot (Karimeen) Seeds", "Mud Crab Instars", "Scampi Larvae"],
    
    // Species Category
    "Carps Family": ["Rohu Seeds", "Catla Seeds", "Carp Seeds", "Silver Carp Seeds", "Grass Carp Seeds", "Common Carp Seeds"],
    "Shrimps & Prawns": ["Prawn Post Larvae", "Shrimp Seeds", "Tiger Prawn PLs", "Scampi Larvae"],
    "Catfish & Murrels": ["Catfish Seeds", "Murrel Seeds", "Pangasius Seeds"],
    "Exotic/Other": ["Tilapia Seeds", "Mahseer Seeds", "Sea Bass (Bhetki) Seeds", "Pearl Spot (Karimeen) Seeds", "Milkfish (Chanos) Seeds", "Mangrove Snapper Seeds"],
    "Crabs & Lobsters": ["Mud Crab Instars"]
  };

  const toggleCategory = (opt) => {
    if (selectedCategories.includes(opt)) {
      setSelectedCategories(prev => prev.filter(c => c !== opt));
    } else {
      setSelectedCategories(prev => [...prev, opt]);
    }
  };


  const filteredSeeds = seeds.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesCategory = selectedCategories.length === 0;
    if (selectedCategories.length > 0) {
      matchesCategory = selectedCategories.some(cat => categoryMapping[cat]?.includes(item.name));
    }
    return matchesSearch && matchesCategory;
  });

  const handleRate = (star) => {
    Swal.fire({
      title: `Review ${selectedProduct.name}`,
      html:
        `<div class="mb-4 text-left"><span class="font-bold">Rating:</span> ${"★".repeat(star)}${"☆".repeat(5-star)}</div>` +
        `<textarea id="swal-comment" class="swal2-textarea" placeholder="Please write about the quality, freshness, and delivery..."></textarea>`,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Publish Review',
      preConfirm: () => {
        const c = document.getElementById('swal-comment').value;
        if (!c.trim()) {
          Swal.showValidationMessage('Please write a review comment');
          return false;
        }
        return { rating: star, comment: c.trim() };
      }
    }).then((result) => {
      if (result.isConfirmed) {
         submitReview(selectedProduct.id, selectedProduct.name, "seeds", user, star, result.value.comment);
         Swal.fire({ icon: 'success', title: 'Review Published!', text: 'Thank you for your valuable feedback.', timer: 2000, showConfirmButton: false });
      }
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8 pt-24">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Fish Seeds for Farming</h2>

      {/* Search & Categories Toggle */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 animate-fade-in-up">
        <div className="relative w-full md:w-1/2 lg:w-2/3">
          <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 text-lg">🔍</span>
          <input 
            type="text" 
            placeholder="Search for farming seeds..." 
            className="w-full pl-12 pr-4 py-3.5 border border-gray-200 bg-white rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all text-gray-700 font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => setShowCategoriesMenu(!showCategoriesMenu)}
          className={`flex items-center justify-between gap-3 px-6 py-3.5 rounded-2xl font-bold shadow-sm transition-all focus:ring-4 focus:ring-green-300 w-full md:w-auto md:min-w-[200px] border ${showCategoriesMenu ? 'bg-green-50 text-green-700 border-green-200' : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'}`}
        >
          <div className="flex items-center gap-2">
            <span>Categories & Filters</span>
            {selectedCategories.length > 0 && (
              <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">{selectedCategories.length}</span>
            )}
          </div>
          <span className={`transform transition-transform ${showCategoriesMenu ? 'rotate-180' : ''}`}>▼</span>
        </button>
      </div>

      {/* Expandable Categories Panel */}
      <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showCategoriesMenu ? 'max-h-[2000px] opacity-100 mb-8' : 'max-h-0 opacity-0 mb-0'}`}>
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-5 mb-6 gap-4">
             <h3 className="font-black text-xl text-gray-800 uppercase tracking-wider flex items-center gap-2">
               <span>Select Categories</span>
             </h3>
             {selectedCategories.length > 0 && (
               <button onClick={() => setSelectedCategories([])} className="text-sm text-red-500 border border-red-200 bg-red-50 px-4 py-2 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all shadow-sm">
                 Clear All Selections
               </button>
             )}
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {categoryGroups.map(group => (
              <div key={group.title} className="bg-gray-50/50 rounded-2xl p-5 border border-gray-100/50">
                <h4 className="font-extrabold text-gray-800 mb-4 border-b border-gray-200 pb-2 text-sm uppercase tracking-wide">{group.title}</h4>
                <div className="flex flex-col gap-3.5">
                  {group.options.map(opt => (
                    <label key={opt} className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative flex items-center justify-center mt-0.5 shrink-0">
                        <input 
                          type="checkbox" 
                          className="w-5 h-5 peer appearance-none border-2 border-gray-300 rounded cursor-pointer checked:bg-green-600 checked:border-green-600 transition-all"
                          checked={selectedCategories.includes(opt)}
                          onChange={() => toggleCategory(opt)}
                        />
                        <svg className="absolute w-3 h-3 pointer-events-none opacity-0 peer-checked:opacity-100 text-white" viewBox="0 0 14 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      <span className={`text-sm select-none leading-relaxed transition-colors ${selectedCategories.includes(opt) ? 'text-green-600 font-bold' : 'text-gray-600 font-medium group-hover:text-green-600'}`}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="w-full flex flex-col">

      {filteredSeeds.length === 0 && (
        <div className="text-center text-gray-500 py-10 text-lg">
          No farming seeds found matching your criteria 😢
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredSeeds.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 border border-gray-50 transition-all duration-300 overflow-hidden flex flex-col relative"
          >
            {item.discount > 0 && (
              <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-md z-10 shadow-sm animate-pulse">
                {item.discount}% OFF
              </div>
            )}
            <div className="p-4 flex-1">
              <div
                className="h-48 w-full bg-white rounded-xl overflow-hidden mb-4 cursor-pointer flex items-center justify-center"
                onClick={() => setSelectedProduct(item)}
                title="Click to view full image"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-1">{item.name}</h3>
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-yellow-400 text-sm">{"★".repeat(Math.round(item.rating || 4.5)) + "☆".repeat(5 - Math.round(item.rating || 4.5))}</span>
                <span className="text-xs text-gray-500 font-medium flex items-center justify-center pt-0.5">({item.rating || 4.5}) • <span className="text-green-500 font-bold ml-1 mr-0.5">✓</span> {item.reviews || 100} Verified Reviews</span>
              </div>
              <div className="flex justify-between items-center mb-4">
                <div className="flex flex-col">
                  {item.discount > 0 ? (
                    <>
                      <p className="text-blue-600 font-medium text-sm">₹{Math.round(item.price * (1 - item.discount / 100))} <span className="text-gray-400">/ packet ({item.packetSize || '1000 seeds'})</span></p>
                      <span className="text-xs text-gray-400 line-through">₹{item.price}</span>
                    </>
                  ) : (
                    <p className="text-blue-600 font-medium text-sm">₹{item.price} <span className="text-gray-400">/ packet ({item.packetSize || '1000 seeds'})</span></p>
                  )}
                </div>
                {item.stock > 0 && item.stock < 10 && (
                  <span className="text-[10px] uppercase tracking-wider font-bold text-orange-600 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-full animate-pulse">
                    Getting out of stock
                  </span>
                )}
              </div>
            </div>

            <div className="px-4 pb-4 mt-auto">
              {item.stock > 0 ? (
                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg transition-colors focus:ring-4 focus:ring-green-300"
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  disabled
                  className="w-full bg-red-100 text-red-500 font-bold py-2.5 rounded-lg cursor-not-allowed border border-red-200"
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      </div>

      {/* 🔍 Product Details Modal */}
      {selectedProduct && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 p-4 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedProduct(null)}
        >
          <div 
            className="relative bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-w-4xl w-full max-h-[90vh] animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Image Section */}
            <div className="w-full md:w-1/2 bg-gray-50 flex items-center justify-center p-8 relative">
              <img 
                src={selectedProduct.image} 
                alt={selectedProduct.name} 
                className="max-h-[40vh] md:max-h-[60vh] w-auto object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            {/* Details Section */}
            <div className="w-full md:w-1/2 p-8 flex flex-col overflow-y-auto bg-white">
              <button 
                className="absolute top-4 right-4 bg-gray-100 text-gray-500 hover:bg-red-500 hover:text-white h-8 w-8 rounded-full text-xl font-bold transition-colors flex items-center justify-center z-10"
                onClick={() => setSelectedProduct(null)}
              >
                &times;
              </button>
              
              <span className="text-xs text-green-600 font-extrabold tracking-widest uppercase mb-2">Farming Seeds</span>
              <h2 className="text-3xl sm:text-4xl font-black text-gray-800 mb-2 tracking-tight">{selectedProduct.name}</h2>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-yellow-400 text-lg">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                      key={star} 
                      onClick={() => handleRate(star)}
                      className="hover:scale-125 transition-transform drop-shadow-sm"
                      title={`Rate ${star} Stars`}
                    >
                      {star <= Math.round(selectedProduct.rating || 4.5) ? "★" : "☆"}
                    </button>
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-700">{selectedProduct.rating || 4.5}</span>
                <span className="text-sm text-gray-400">({selectedProduct.reviews || 100} verified reviews)</span>
              </div>
              
              {selectedProduct.discount > 0 && (
                <div className="bg-red-50 w-max px-3 py-1 rounded-md mb-4 border border-red-100">
                  <span className="text-red-600 font-bold text-sm">Sale: {selectedProduct.discount}% discount applied!</span>
                </div>
              )}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                {selectedProduct.discount > 0 ? (
                  <>
                    <span className="text-3xl font-extrabold text-green-600">₹{Math.round(selectedProduct.price * (1 - selectedProduct.discount / 100))}</span>
                    <span className="text-xl text-gray-400 line-through font-medium">₹{selectedProduct.price}</span>
                  </>
                ) : (
                  <span className="text-3xl font-extrabold text-green-600">₹{selectedProduct.price}</span>
                )}
                <span className="text-gray-400 font-medium tracking-wide">/ packet ({selectedProduct.packetSize || '1000 seeds'})</span>
              </div>
              
              <div className="mb-6 space-y-4 text-gray-600 leading-relaxed text-sm lg:text-base">
                {selectedProduct.description ? (
                  <p><strong>Description:</strong> {selectedProduct.description}</p>
                ) : (
                  <p><strong>Description:</strong> Premium grade, disease-free <strong>{selectedProduct.name.toLowerCase()}</strong> for high-yield aquaculture farming. Rigorously tested for active growth and survival rates.</p>
                )}
                
                <div className="bg-green-50/50 p-4 rounded-xl border border-green-100 mt-2">
                  <h4 className="font-bold text-gray-800 mb-2 text-sm uppercase tracking-wide">✨ Premium Qualities</h4>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    {selectedProduct.highlights && selectedProduct.highlights.length > 0 ? (
                      selectedProduct.highlights.map((hlt, i) => (
                        <li key={i} className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> {hlt}</li>
                      ))
                    ) : (
                      <>
                        <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> 100% Disease-Free & Lab Certified</li>
                        <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Unmatched Survival & Rapid Growth</li>
                        <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Adapted to local climatic conditions</li>
                        <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✓</span> Pre-quarantined for hatchery stocking</li>
                      </>
                    )}
                  </ul>
                </div>
                
                <div className="flex items-center gap-2 mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100 inline-flex">
                   <strong>Stock Status:</strong> 
                   {selectedProduct.stock > 10 ? (
                     <span className="text-green-700 font-bold flex items-center gap-1">🟢 In Stock ({selectedProduct.stock} packets)</span>
                   ) : selectedProduct.stock > 0 ? (
                     <span className="text-orange-600 font-bold flex items-center gap-1 animate-pulse">🟠 Limited ({selectedProduct.stock} packets left)</span>
                   ) : (
                     <span className="text-red-500 font-bold flex items-center gap-1">🔴 Out of Stock</span>
                   )}
                </div>
              </div>
              <div className="mt-8 border-t border-gray-100 pt-6">
                <h4 className="font-black text-xl text-gray-800 mb-4 tracking-tight flex items-center justify-between">
                  <span>Customer Reviews</span>
                  <span className="text-sm font-medium bg-green-50 text-green-700 px-3 py-1 rounded-full">{selectedProduct.reviewsList ? selectedProduct.reviewsList.length : 0} verified</span>
                </h4>
                
                {(!selectedProduct.reviewsList || selectedProduct.reviewsList.length === 0) ? (
                  <p className="text-gray-500 italic text-sm">No reviews yet. Be the first to purchase and review!</p>
                ) : (
                  <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {selectedProduct.reviewsList.map((review, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm transition hover:shadow-md">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-inner uppercase">
                              {review.user?.charAt(0) || 'U'}
                            </div>
                            <div>
                              <p className="font-bold text-gray-800 text-sm">{review.user || 'Customer'}</p>
                              {review.verified && <p className="text-[10px] text-green-600 font-bold uppercase tracking-wider flex items-center gap-0.5"><span className="text-sm leading-none">✓</span> Verified Purchase</p>}
                            </div>
                          </div>
                          <span className="text-xs text-gray-400 font-medium">{review.date}</span>
                        </div>
                        <div className="flex text-yellow-400 text-sm mb-2">
                          {"★".repeat(review.rating) + "☆".repeat(5 - review.rating)}
                        </div>
                        <p className="text-gray-700 text-sm italic leading-relaxed">"{review.comment}"</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FishSeeds;