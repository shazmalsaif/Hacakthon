import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './pages/HomeView';
import { ProductDetailView } from './pages/ProductDetailView';
import { CartView } from './pages/CartView';
import { AIAssistantOverlay } from './components/AIAssistantOverlay';
import { Check } from 'lucide-react';

const AppContent: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAiAssistantOpen, setIsAiAssistantOpen] = useState(false);
  const { showToast, closeToast, lastAddedProduct } = useCart();

  const handleOpenAiAssistant = () => {
    setIsAiAssistantOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F7F7F5] flex flex-col font-sans text-[#131D21] selection:bg-[#E8623D] selection:text-white">
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        openAiAssistant={handleOpenAiAssistant}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route
            path="/"
            element={
              <HomeView
                searchQuery={searchQuery}
                openAiAssistant={handleOpenAiAssistant}
              />
            }
          />
          <Route path="/product/:id" element={<ProductDetailView />} />
          <Route path="/cart" element={<CartView />} />
          <Route
            path="*"
            element={
              <HomeView
                searchQuery={searchQuery}
                openAiAssistant={handleOpenAiAssistant}
              />
            }
          />
        </Routes>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating AI Shopping Assistant Overlay (Screen 4) */}
      <AIAssistantOverlay
        isOpen={isAiAssistantOpen}
        onClose={() => setIsAiAssistantOpen(false)}
        onToggle={() => setIsAiAssistantOpen(!isAiAssistantOpen)}
      />

      {/* Toast Notification when adding item */}
      {showToast && lastAddedProduct && (
        <div className="fixed bottom-6 left-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-scaleIn border border-slate-700">
          <div className="w-8 h-8 rounded-lg bg-[#E8623D] flex items-center justify-center text-white font-bold">
            <Check className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Added to your bag</p>
            <p className="text-[11px] text-gray-300 truncate max-w-[180px]">{lastAddedProduct.name}</p>
          </div>
          <button
            onClick={closeToast}
            className="text-gray-400 hover:text-white text-xs ml-2"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
