import React from 'react';
import { useNavigate } from "react-router-dom";

export default function HuzzlerHero() {
  const navigate = useNavigate();

  return (
    <section className="relative bg-[#0a0a14] min-h-screen overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
        {/* Left content */}
        <div className="flex flex-col justify-center px-8 lg:px-16 py-20 z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 self-start px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-gray-300 mb-8">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            AI-POWERED FREELANCE MARKETPLACE
          </div>

          {/* Heading */}
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="text-white">Hire</span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
              Freelancers
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
            The world's most intelligent platform for enterprise hiring and
            elite independent talent. Powered by AI precision matching — find
            the perfect expert in seconds.
          </p>

          {/* Search card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 max-w-md backdrop-blur-sm">
            {/* Tabs */}
            <div className="flex bg-black/30 rounded-full p-1 mb-4">
              <button 
                onClick={() => navigate("/roleselect")}
                className="flex-1 bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-semibold py-2.5 rounded-full">
                Find Talent
              </button>
              <button 
                onClick={() => navigate("/client-job-search")}
                className="flex-1 text-gray-400 text-sm font-medium py-2.5 rounded-full hover:text-white transition">
                Browse Jobs
              </button>
            </div>

            {/* Search input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Search for developers, designers, writers..."
                className="flex-1 bg-black/30 border border-white/10 rounded-full px-5 py-3 text-sm text-gray-300 placeholder-gray-500 outline-none focus:border-violet-400 transition"
              />
              <button className="bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm font-semibold px-6 py-3 rounded-full hover:opacity-90 transition">
                Search
              </button>
            </div>

            {/* Trusted by */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <p className="text-[10px] tracking-widest text-gray-500 mb-3">
                TRUSTED BY BUILDERS AT
              </p>
              <div className="flex gap-6 text-sm font-semibold text-gray-400 flex-wrap">
                <span>Microsoft</span>
                <span>Airbnb</span>
                <span>Stripe</span>
                <span>Notion</span>
                <span>Figma</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-12 mt-12">
            <div>
              <p className="text-3xl font-bold text-white">
                48K<span className="text-violet-400">+</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">Active Freelancers</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                $2.4<span className="text-violet-400">M</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">Paid Out Monthly</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">
                98<span className="text-violet-400">%</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">Client Satisfaction</p>
            </div>
          </div>
</div>

        {/* Right image */}
        <div className="relative hidden lg:block">
          <img
  src="https://images.unsplash.com/photo-1652819674544-a284366b1d0d?q=80&w=1053&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  alt="Article"
  className="w-full h-full object-cover"
/>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a14] via-[#0a0a14]/40 to-transparent"></div>
        </div>
      </div>

      {/* Marquee strip */}
      
    </section>
  );
}