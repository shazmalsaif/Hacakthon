import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Search, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  openAiAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ searchQuery, setSearchQuery, openAiAssistant }) => {
  const location = useLocation();
  const { totalItemsCount } = useCart();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/?filter=all' },
    { name: 'Deals', path: '/?filter=deals' },
    { name: 'Account', path: '/account' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left: Brand Logo & Links */}
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="w-9 h-9 rounded-xl bg-coral/10 text-coral flex items-center justify-center font-black text-xl group-hover:bg-coral group-hover:text-white transition-colors duration-200">
              F
            </span>
            <span className="font-extrabold text-2xl tracking-tight text-[#131D21]">
              Fun Gadgets
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || (link.path === '/' && location.pathname === '/');
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`relative py-2 text-sm font-semibold transition-colors duration-150 ${
                    isActive ? 'text-[#131D21]' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#E8623D] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right: Search, AI Shortcut & Cart Icon */}
        <div className="flex items-center space-x-4">
          {/* Search bar */}
          <div className="relative hidden sm:block w-60 lg:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search gadgets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-100/80 border border-transparent rounded-full text-sm focus:outline-none focus:bg-white focus:border-[#E8623D] focus:ring-2 focus:ring-[#E8623D]/20 transition-all duration-200"
            />
          </div>

          {/* Quick AI Trigger Pill */}
          <button
            onClick={openAiAssistant}
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 bg-[#FFF0EB] text-[#E8623D] hover:bg-[#E8623D] hover:text-white rounded-full text-xs font-semibold transition-all duration-200 shadow-2xs"
            title="Ask AI Shopping Assistant"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask AI</span>
          </button>

          {/* Cart Icon with badge */}
          <Link
            to="/cart"
            className="relative p-2.5 rounded-full hover:bg-gray-100 text-gray-700 transition-colors"
            aria-label="Shopping Cart"
          >
            <ShoppingBag className="w-6 h-6 text-[#131D21]" />
            {totalItemsCount > 0 && (
              <span className="absolute top-1 right-1 min-w-[20px] h-[20px] bg-[#E8623D] text-white text-xs font-bold rounded-full flex items-center justify-center px-1 shadow-xs animate-scaleIn">
                {totalItemsCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};
