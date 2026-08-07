import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-[#E8623D] text-white flex items-center justify-center font-bold text-lg">
              F
            </span>
            <span className="font-extrabold text-xl text-[#131D21]">Fun Gadgets</span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm font-medium text-gray-600">
            <Link to="#" className="hover:text-[#E8623D] transition-colors">About</Link>
            <Link to="#" className="hover:text-[#E8623D] transition-colors">Shipping</Link>
            <Link to="#" className="hover:text-[#E8623D] transition-colors">FAQ</Link>
            <Link to="#" className="hover:text-[#E8623D] transition-colors">Contact</Link>
          </div>

          {/* Copyright */}
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Fun Gadgets Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
