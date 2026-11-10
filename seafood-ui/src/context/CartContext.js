import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";

import rohuImg from '../assets/rohu_fish.png';
import freshMixedImg from '../assets/fresh_mixed_catch.png';
import kingPrawnsImg from '../assets/king_prawns.png';
import mudCrabsImg from '../assets/live_mud_crabs.png';
import salmonImg from '../assets/atlantic_salmon.png';
import squidImg from '../assets/fresh_squid.png';
import tunaImg from '../assets/tuna_steaks.png';
import musselsImg from '../assets/fresh_mussels.png';
import troutImg from '../assets/rainbow_trout.png';
import oystersImg from '../assets/fresh_oysters_v2.png';

import rohuSeedsImg from '../assets/rohu_seeds.png';
import catlaSeedsImg from '../assets/catla_seeds.png';
import tilapiaSeedsImg from '../assets/tilapia_seeds.png';
import prawnLarvaeImg from '../assets/prawn_post_larvae.png';
import pangasiusSeedsImg from '../assets/pangasius_seeds.png';
import murrelSeedsImg from '../assets/murrel_seeds.png';
import carpSeedsImg from '../assets/carp_seeds.png';
import shrimpSeedsImg from '../assets/shrimp_seeds_v4.jpg';
import catfishSeedsImg from '../assets/catfish_seeds.png';
import mahseerSeedsImg from '../assets/mahseer_seeds_v2.png';

// NEWLY ADDED REAL IMAGES
import pomfretImg from '../assets/new_imgs/pomfret.jpg';
import hilsaImg from '../assets/new_imgs/hilsa.jpg';
import redSnapperImg from '../assets/new_imgs/red_snapper.jpg';
import bombayDuckImg from '../assets/new_imgs/bombay_duck.jpg';
import bombayDuckImg3 from '../assets/new_imgs/bombay_duck3.jpg';
import silverBellyImg from '../assets/new_imgs/silver_belly.jpg';
import tigerPrawnImg from '../assets/new_imgs/tiger_prawn.jpg';
import mackerelImg from '../assets/new_imgs/mackerel.jpg';
import sardinesImg from '../assets/new_imgs/sardines.jpg';
import rockLobsterImg from '../assets/new_imgs/rock_lobster.jpg';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // USER STATE
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // CART STATE
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );

  // ORDERS STATE
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem("orders")) || []
  );

  // PRODUCTS STATE
  const defaultProducts = [
    { id: 1, name: "Rohu Fish", price: 250, discount: 10, image: rohuImg, stock: 50, rating: 4.5, reviews: 120, category: "Freshwater" },
    { id: 2, name: "Fresh Mixed Catch", price: 259, discount: 0, image: freshMixedImg, stock: 20, rating: 4.2, reviews: 85, category: "Saltwater" },
    { id: 3, name: "King Prawns", price: 850, discount: 15, image: kingPrawnsImg, stock: 30, rating: 4.8, reviews: 210, category: "Shellfish" },
    { id: 4, name: "Live Mud Crabs", price: 600, discount: 0, image: mudCrabsImg, stock: 15, rating: 4.6, reviews: 90, category: "Shellfish" },
    { id: 5, name: "Atlantic Salmon", price: 1200, discount: 5, image: salmonImg, stock: 40, rating: 4.9, reviews: 340, category: "Saltwater" },
    { id: 6, name: "Fresh Squid", price: 450, discount: 0, image: squidImg, stock: 25, rating: 4.3, reviews: 150, category: "Shellfish" },
    { id: 7, name: "Tuna Steaks", price: 950, discount: 0, image: tunaImg, stock: 10, rating: 4.7, reviews: 180, category: "Saltwater" },
    { id: 8, name: "Fresh Mussels", price: 350, discount: 0, image: musselsImg, stock: 60, rating: 4.4, reviews: 110, category: "Shellfish" },
    { id: 9, name: "Rainbow Trout", price: 550, discount: 12, image: troutImg, stock: 35, rating: 4.5, reviews: 95, category: "Freshwater" },
    { id: 10, name: "Fresh Oysters", price: 1100, discount: 0, image: oystersImg, stock: 50, rating: 4.8, reviews: 275, category: "Shellfish" },
    { id: 11, name: "Fresh Pomfret", price: 850, discount: 5, image: pomfretImg, stock: 35, rating: 4.7, reviews: 140, category: "Saltwater" },
    { id: 12, name: "Hilsa (Ilish)", price: 1500, discount: 0, image: hilsaImg, stock: 20, rating: 4.9, reviews: 250, category: "River Fish" },
    { id: 13, name: "Seer Fish (Surmai)", price: 1100, discount: 10, image: tunaImg, stock: 25, rating: 4.8, reviews: 180, category: "Saltwater" },
    { id: 14, name: "Red Snapper", price: 900, discount: 0, image: redSnapperImg, stock: 40, rating: 4.6, reviews: 110, category: "Saltwater" },
    { id: 15, name: "Bombay Duck", price: 300, discount: 5, image: bombayDuckImg3, stock: 45, rating: 4.3, reviews: 90, category: "Saltwater" },
    { id: 16, name: "Mackerel (Bangda)", price: 250, discount: 0, image: mackerelImg, stock: 60, rating: 4.5, reviews: 200, category: "Saltwater" },
    { id: 17, name: "Sardines (Mathi)", price: 200, discount: 0, image: sardinesImg, stock: 80, rating: 4.6, reviews: 190, category: "Saltwater" },
    { id: 18, name: "Silver Belly", price: 350, discount: 0, image: silverBellyImg, stock: 30, rating: 4.4, reviews: 80, category: "Saltwater" },
    { id: 19, name: "Tiger Prawns", price: 1300, discount: 15, image: tigerPrawnImg, stock: 25, rating: 4.9, reviews: 310, category: "Shellfish" },
    { id: 20, name: "Rock Lobster", price: 2000, discount: 10, image: rockLobsterImg, stock: 15, rating: 4.8, reviews: 150, category: "Shellfish" }
  ];

  const defaultSeeds = [
    { id: 1, name: "Rohu Seeds", price: 200, discount: 10, image: rohuSeedsImg, stock: 100, packetSize: "1000 seeds", rating: 4.4, reviews: 150, category: "Carp" },
    { id: 2, name: "Catla Seeds", price: 250, discount: 0, image: catlaSeedsImg, stock: 80, packetSize: "1000 seeds", rating: 4.5, reviews: 130, category: "Carp" },
    { id: 3, name: "Tilapia Seeds", price: 300, discount: 5, image: tilapiaSeedsImg, stock: 120, packetSize: "1000 seeds", rating: 4.7, reviews: 210, category: "Other Fish" },
    { id: 4, name: "Prawn Post Larvae", price: 450, discount: 0, image: prawnLarvaeImg, stock: 200, packetSize: "5000 PL", rating: 4.8, reviews: 310, category: "Shrimp & Prawns" },
    { id: 5, name: "Pangasius Seeds", price: 180, discount: 0, image: pangasiusSeedsImg, stock: 75, packetSize: "1000 seeds", rating: 4.3, reviews: 90, category: "Other Fish" },
    { id: 6, name: "Murrel Seeds", price: 400, discount: 15, image: murrelSeedsImg, stock: 90, packetSize: "500 seeds", rating: 4.6, reviews: 160, category: "Other Fish" },
    { id: 7, name: "Carp Seeds", price: 220, discount: 0, image: carpSeedsImg, stock: 60, packetSize: "1000 seeds", rating: 4.2, reviews: 110, category: "Carp" },
    { id: 8, name: "Shrimp Seeds", price: 500, discount: 0, image: shrimpSeedsImg, stock: 110, packetSize: "5000 PL", rating: 4.9, reviews: 400, category: "Shrimp & Prawns" },
    { id: 9, name: "Catfish Seeds", price: 210, discount: 0, image: catfishSeedsImg, stock: 85, packetSize: "1000 seeds", rating: 4.1, reviews: 75, category: "Other Fish" },
    { id: 10, name: "Mahseer Seeds", price: 450, discount: 0, image: mahseerSeedsImg, stock: 50, packetSize: "500 seeds", rating: 4.7, reviews: 140, category: "Carp" },
    { id: 11, name: "Sea Bass (Bhetki) Seeds", price: 600, discount: 10, image: tilapiaSeedsImg, stock: 80, packetSize: "500 seeds", rating: 4.7, reviews: 120, category: "Other Fish" },
    { id: 12, name: "Silver Carp Seeds", price: 220, discount: 0, image: pangasiusSeedsImg, stock: 150, packetSize: "1000 seeds", rating: 4.5, reviews: 85, category: "Carp" },
    { id: 13, name: "Grass Carp Seeds", price: 240, discount: 5, image: catlaSeedsImg, stock: 130, packetSize: "1000 seeds", rating: 4.6, reviews: 145, category: "Carp" },
    { id: 14, name: "Common Carp Seeds", price: 200, discount: 0, image: rohuSeedsImg, stock: 180, packetSize: "1000 seeds", rating: 4.4, reviews: 95, category: "Carp" },
    { id: 15, name: "Pearl Spot (Karimeen) Seeds", price: 550, discount: 15, image: murrelSeedsImg, stock: 60, packetSize: "200 seeds", rating: 4.9, reviews: 210, category: "Other Fish" },
    { id: 16, name: "Mud Crab Instars", price: 800, discount: 0, image: mudCrabsImg, stock: 40, packetSize: "100 crablets", rating: 4.8, reviews: 150, category: "Crabs" },
    { id: 17, name: "Tiger Prawn PLs", price: 550, discount: 5, image: shrimpSeedsImg, stock: 200, packetSize: "5000 PL", rating: 4.7, reviews: 230, category: "Shrimp & Prawns" },
    { id: 18, name: "Scampi Larvae", price: 650, discount: 0, image: prawnLarvaeImg, stock: 110, packetSize: "2000 PL", rating: 4.6, reviews: 170, category: "Shrimp & Prawns" },
    { id: 19, name: "Milkfish (Chanos) Seeds", price: 350, discount: 10, image: catfishSeedsImg, stock: 90, packetSize: "1000 seeds", rating: 4.5, reviews: 110, category: "Other Fish" },
    { id: 20, name: "Mangrove Snapper Seeds", price: 700, discount: 0, image: mahseerSeedsImg, stock: 50, packetSize: "500 seeds", rating: 4.8, reviews: 140, category: "Other Fish" }
  ];

  const generateMockReviews = (name, type) => {
    const firstNames = ["Ravi", "Suresh", "Srinivas", "Kalyan", "Venkat", "Kiran", "Vijay", "Anil", "Harish", "Gopi", "Sneha", "Kavya", "Swapna", "Anjali", "Pooja", "Ram", "Naresh", "Sai", "Prakash", "Teja"];
    const lastNames = ["Rao", "Reddy", "Choudary", "Kumar", "Sharma", "Varma", "Goud", "Naidu"];
    
    const commentsGoodSeafood = [
      "Very fresh, definitely will buy again.", "Quality is top notch.", "Tastes authentic, exactly what I was looking for.", "Packaging was great and fish was super fresh.", "Worth the price. Very clean.", "Impressive quality.", "Delivered on time and perfectly chilled.", "Tastes like it was just caught today.", "My family loved it when I cooked it.", "No chemical smell, pure coastal quality."
    ];
    const commentsGoodSeeds = [
      "Survival rate is very high.", "Fast delivery, seeds are very active.", "Good sizing, exactly as described.", "Better than other vendors I tried.", "Very healthy batch of seeds.", "Pond acclimation was smooth.", "Mortality was less than 5%.", "High quality packaging.", "Received in good oxygenated condition.", "Will order my next batch from here."
    ];
    const commentsAvg = ["It's okay, decent for the price.", "Took a bit long to deliver, but quality was fine.", "Average quality, nothing special.", "Good but a bit overpriced.", "Arrived slightly late, but acceptable."];
    
    const count = Math.floor(Math.random() * 6) + 10; // 10 to 15 reviews
    const pool = [];
    
    for (let i = 0; i < count; i++) {
        const rating = Math.random() > 0.8 ? 4 : 5; // Mostly 5, some 4s
        const fname = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lname = lastNames[Math.floor(Math.random() * lastNames.length)];
        const commentsPool = rating === 5 ? (type === 'seeds' ? commentsGoodSeeds : commentsGoodSeafood) : commentsAvg;
        const comment = commentsPool[Math.floor(Math.random() * commentsPool.length)];
        const days = Math.floor(Math.random() * 60) + 1; // 1 to 60 days ago
        
        pool.push({
            id: Date.now() + Math.random(),
            user: `${fname} ${lname}`,
            rating: rating,
            comment: comment,
            date: `${days} day${days > 1 ? 's' : ''} ago`,
            verified: true
        });
    }
    
    pool.sort((a, b) => parseInt(a.date) - parseInt(b.date)); // Sort by days ago
    
    return pool;
  };

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem("allProducts");
    if (saved) {
      const parsed = JSON.parse(saved);
      return defaultProducts.map(dp => {
        const p = parsed.find(item => item.id === dp.id);
        if (p) {
          return { 
            ...p, 
            name: dp.name,
            image: dp.image, 
            category: dp.category,
            stock: p.stock !== undefined ? p.stock : dp.stock,
            discount: p.discount !== undefined ? p.discount : dp.discount,
            rating: p.rating !== undefined ? p.rating : dp.rating,
            reviews: p.reviews !== undefined ? p.reviews : dp.reviews,
            reviewsList: (p.reviewsList && p.reviewsList.length >= 10) ? p.reviewsList : generateMockReviews(dp.name, 'seafood')
          };
        }
        return { ...dp, reviewsList: generateMockReviews(dp.name, 'seafood') };
      });
    }
    return defaultProducts.map(p => ({ ...p, reviewsList: generateMockReviews(p.name, 'seafood') }));
  });

  const [seeds, setSeeds] = useState(() => {
    const saved = localStorage.getItem("allSeeds");
    if (saved) {
      const parsed = JSON.parse(saved);
      return defaultSeeds.map(ds => {
        const s = parsed.find(item => item.id === ds.id);
        if (s) {
          return { 
            ...s, 
            name: ds.name,
            image: ds.image, 
            category: ds.category,
            stock: s.stock !== undefined ? s.stock : ds.stock,
            discount: s.discount !== undefined ? s.discount : ds.discount,
            packetSize: s.packetSize !== undefined ? s.packetSize : ds.packetSize,
            rating: s.rating !== undefined ? s.rating : ds.rating,
            reviews: s.reviews !== undefined ? s.reviews : ds.reviews,
            reviewsList: (s.reviewsList && s.reviewsList.length >= 10) ? s.reviewsList : generateMockReviews(ds.name, 'seeds')
          };
        }
        return { ...ds, reviewsList: generateMockReviews(ds.name, 'seeds') };
      });
    }
    return defaultSeeds.map(s => ({ ...s, reviewsList: generateMockReviews(s.name, 'seeds') }));
  });

  // ✅ SUBMIT REVIEW
  const submitReview = (id, productName, category, userObj, rating, comment) => {
    const updateItem = (item) => {
      const currentReviews = item.reviews || 100;
      const currentRating = item.rating || 4.5;
      const newReviews = currentReviews + 1;
      const newAggregate = ((currentRating * currentReviews) + rating) / newReviews;
      
      const newReviewObj = {
        id: Date.now(),
        user: userObj?.name || "Verified Customer",
        rating: rating,
        comment: comment,
        date: "Just now",
        verified: true
      };

      return { 
        ...item, 
        rating: Number(newAggregate.toFixed(1)), 
        reviews: newReviews,
        reviewsList: [newReviewObj, ...(item.reviewsList || [])]
      };
    };

    if (category === "seafood") {
      setProducts(prev => prev.map(p => p.id === id ? updateItem(p) : p));
    } else {
      setSeeds(prev => prev.map(s => s.id === id ? updateItem(s) : s));
    }
  };

  // SAVE PRODUCTS & SEEDS
  useEffect(() => {
    localStorage.setItem("allProducts", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem("allSeeds", JSON.stringify(seeds));
  }, [seeds]);

  // ✅ ADD TO CART (NO DUPLICATES)
  const addToCart = (item) => {
    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Required',
        text: 'You must be logged in to add products to the cart!',
        confirmButtonColor: '#3085d6'
      });
      return;
    }

    const existing = cart.find((i) => i.name === item.name);

    if (existing) {
      Swal.fire({
        icon: 'info',
        title: 'Already in Cart',
        text: 'Item already added to cart!',
        showCancelButton: true,
        confirmButtonText: 'Go to Cart 🛒',
        cancelButtonText: 'Continue Shopping',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#10B981',
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/cart";
        }
      });
      return;
    }

    const finalPrice = item.discount ? Math.round(item.price * (1 - item.discount / 100)) : item.price;
    setCart([...cart, { ...item, quantity: 1, originalPrice: item.price, price: finalPrice }]);

    Swal.fire({
      icon: 'success',
      title: 'Added to Cart!',
      html: `<b>${item.name}</b> has been added to your cart.`,
      showCancelButton: true,
      confirmButtonText: 'Go to Cart 🛒',
      cancelButtonText: 'Continue Shopping',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#10B981',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/cart";
      }
    });
  };

  // ✅ REMOVE ITEM
  const removeFromCart = (name) => {
    const updatedCart = cart.filter((item) => item.name !== name);
    setCart(updatedCart);
  };

  // ✅ PLACE ORDER
  const placeOrder = (paymentMethod = "None", address = "N/A", saveAddress = false, rawAddrObj = null) => {
    if (cart.length === 0) return;

    const paymentLabels = {
      gpay: "Google Pay",
      phonepe: "PhonePe",
      paytm: "Paytm UPI",
      cod: "Cash on Delivery",
      None: "N/A"
    };

    const newOrder = {
      id: Date.now(),
      customerName: user?.name || user?.email?.split('@')[0] || "Unknown User",
      customerEmail: user?.email || "N/A",
      deliveryAddress: address,
      items: cart,
      total: cart.reduce(
        (sum, item) => sum + item.price * (item.quantity || 1),
        0
      ),
      date: new Date().toLocaleString(),
      payment: paymentLabels[paymentMethod] || paymentMethod,
      status: "Pending", // Add initial tracking status
    };

    // Save Address Logic
    if (saveAddress && rawAddrObj) {
      setUser(prev => ({ ...prev, savedAddress: rawAddrObj }));
    }

    // Decrease Stock using functional updates to prevent stale state issues
    setProducts(prevProducts => prevProducts.map((invItem) => {
      const cartItem = cart.find(c => c.id === invItem.id && c.name === invItem.name);
      if (cartItem) {
        return { ...invItem, stock: Math.max(0, (invItem.stock || 0) - (cartItem.quantity || 1)) };
      }
      return invItem;
    }));

    setSeeds(prevSeeds => prevSeeds.map((invItem) => {
      const cartItem = cart.find(c => c.id === invItem.id && c.name === invItem.name);
      if (cartItem) {
        return { ...invItem, stock: Math.max(0, (invItem.stock || 0) - (cartItem.quantity || 1)) };
      }
      return invItem;
    }));

    setOrders((prev) => [...prev, newOrder]);
    setCart([]);

    Swal.fire({
      icon: 'success',
      title: 'Order Placed!',
      text: 'Order placed successfully!',
      timer: 2000,
      showConfirmButton: false
    });
  };

  // ✅ UPDATE ORDER STATUS
  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
  };

  // ✅ UPDATE ORDER ADDRESS
  const updateOrderAddress = (orderId, newAddress) => {
    setOrders(orders.map(o => o.id === orderId ? { ...o, deliveryAddress: newAddress } : o));
  };

  // SAVE USER
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // SAVE ORDERS
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <CartContext.Provider
      value={{
        user,
        setUser,
        cart,
        setCart,
        addToCart,
        removeFromCart,
        placeOrder,
        updateOrderStatus,
        updateOrderAddress,
        orders,
        setOrders,
        products,
        setProducts,
        seeds,
        setSeeds,
        submitReview,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};