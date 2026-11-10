import React from "react";
import { Link } from "react-router-dom";

import fishBg from '../assets/atlantic_salmon.png';
import seedBg from '../assets/prawn_post_larvae.png';

function Home() {
  return (
    <div className="min-h-[calc(100vh-80px)] mt-20 flex flex-col items-center justify-center bg-gray-50 pt-10 pb-20 px-4 sm:px-8">
      
      {/* Grand Hero Section */}
      <div className="text-center max-w-3xl mb-16 space-y-4">
        <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-400">
          Aquaculture & Seafood Hub
        </h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-medium lead-relaxed">
          The ultimate supply chain platform bridging the gap between cutting-edge aquaculture farming and premium fresh seafood retail.
        </p>
      </div>

      {/* Dual Portals Container */}
      <div className="flex flex-col md:flex-row gap-10 w-full max-w-5xl">
        
        {/* Seafood Portal (B2C) */}
        <Link 
          to="/seafood" 
          className="flex-1 group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-[400px] border-4 border-transparent hover:border-blue-400/50"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              src={fishBg} 
              alt="Fresh Seafood" 
              className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-110 blur-[2px] opacity-80" 
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end text-white">
            <span className="text-blue-300 font-bold uppercase tracking-wider text-sm mb-2 opacity-90">For Retailers & Consumers</span>
            <h2 className="text-4xl font-bold mb-4 group-hover:text-blue-200 transition-colors">Shop Fresh Seafood 🐟</h2>
            <p className="text-gray-200 leading-relaxed mb-6 opacity-90">
              Browse our marketplace of incredibly high-quality, perfectly graded live and raw seafood ready for immediate delivery.
            </p>
            <div className="inline-flex items-center gap-2 font-bold text-lg text-blue-300 group-hover:translate-x-3 transition-transform">
              Enter Marketplace <span className="text-2xl">→</span>
            </div>
          </div>
        </Link>


        {/* Farming Seeds Portal (B2B) */}
        <Link 
          to="/seeds" 
          className="flex-1 group relative rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 h-[400px] border-4 border-transparent hover:border-amber-400/50"
        >
          {/* Background Image */}
          <div className="absolute inset-0 z-0 bg-black">
            <img 
              src={seedBg} 
              alt="Farming Seeds" 
              className="h-full w-full object-cover transform transition-transform duration-700 group-hover:scale-110 blur-[2px] opacity-60" 
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="absolute inset-0 z-10 p-10 flex flex-col justify-end text-white">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-sm mb-2 opacity-90">For Aquaculture Farmers</span>
            <h2 className="text-4xl font-bold mb-4 group-hover:text-amber-200 transition-colors">Buy Farming Seeds 🌾</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Source prime genetic aquaculture stock, fingerlings, and post-larvae directly from certified hatcheries to jumpstart your farming cycles.
            </p>
            <div className="inline-flex items-center gap-2 font-bold text-lg text-amber-400 group-hover:translate-x-3 transition-transform">
              Enter Hatchery Hub <span className="text-2xl">→</span>
            </div>
          </div>
        </Link>
        
      </div>

    </div>
  );
}

export default Home;