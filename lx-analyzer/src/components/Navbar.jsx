import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="w-full py-4 px-6 shadow-lg flex items-center justify-between relative rounded-2xl  bg-gradient-to-r from-indigo-500 via-sky-500 to-blue-300">
      
      {/* Left side (optional nav links in the future) */}
      <div className="absolute left-6 flex gap-5 text-lg">
        
      </div>

      {/* Centered Brand Name */}
      <div className="mx-auto text-3xl font-extrabold text-white tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
        Lexi Logic
      </div>

      {/* Right side spacer for symmetry */}
      <div className="w-[150px]"></div>
    </nav>
  );
}
