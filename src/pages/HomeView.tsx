import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Check, Sparkles, Star } from 'lucide-react';
import { PRODUCTS, type Product } from '../data/products';
import { useCart } from '../context/CartContext';

interface HomeViewProps {
  searchQuery: string;
  openAiAssistant: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ searchQuery, openAiAssistant }) => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const categories = ['All', 'Home', 'Workspace', 'Living', 'Lighting', 'Audio', 'Hydration'];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1800);
  };

  return (
    <div className="space-y-12">
      {/* Hero Banner Section */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-gray-100 shadow-sm overflow-hidden relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF0EB] text-[#E8623D] text-xs font-semibold tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Next-Gen Smart Living</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#131D21] tracking-tight leading-[1.1]">
              Smart Home <br />
              <span className="text-[#E8623D]">Essentials</span>
            </h1>

            <p className="text-gray-600 text-base sm:text-lg max-w-lg leading-relaxed">
              Upgrade your living space with our latest selection of intelligent, beautiful devices designed for everyday productivity and comfort.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  const el = document.getElementById('featured-products');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-4 bg-[#E8623D] text-white font-bold rounded-2xl hover:bg-[#D54F2B] transition-all duration-200 shadow-lg shadow-[#E8623D]/25 hover:shadow-xl hover:-translate-y-0.5"
              >
                Shop Now
              </button>

              <button
                onClick={openAiAssistant}
                className="px-6 py-4 bg-gray-100 text-[#131D21] font-semibold rounded-2xl hover:bg-gray-200 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-[#E8623D]" />
                <span>Ask AI Recommendation</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl bg-gray-100 aspect-4/3 lg:aspect-square">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=1200&q=80"
                alt="Smart Home Essentials Hero"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-[#E8623D]/10 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Category Pill Filters */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs uppercase tracking-widest font-bold text-gray-400">Browse Categories</h2>
        </div>
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-[#E8623D] text-white shadow-md shadow-[#E8623D]/20'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Products Grid */}
      <section id="featured-products" className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#131D21]">Featured Products</h2>
            <p className="text-gray-500 text-sm mt-1">Explore our top-rated smart gadgets</p>
          </div>
          <span className="text-xs font-semibold text-gray-500 bg-white px-3.5 py-1.5 rounded-full border border-gray-200">
            {filteredProducts.length} items
          </span>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center space-y-4 border border-gray-100">
            <p className="text-gray-500 font-medium">No gadgets found matching your filter or search query.</p>
            <button
              onClick={() => setSelectedCategory('All')}
              className="px-4 py-2 bg-[#FFF0EB] text-[#E8623D] font-bold text-sm rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
              >
                <div>
                  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-bold text-gray-700 uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-xs text-amber-500 mb-1 font-semibold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{product.rating}</span>
                    <span className="text-gray-400 font-normal">({product.reviewsCount})</span>
                  </div>

                  <h3 className="font-bold text-lg text-[#131D21] group-hover:text-[#E8623D] transition-colors leading-snug">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1 mb-3">
                    {product.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <span className="text-xl font-extrabold text-[#E8623D]">
                    ${product.price.toFixed(2)}
                  </span>

                  <button
                    onClick={(e) => handleAddToCart(e, product)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 ${
                      addedIds[product.id]
                        ? 'bg-emerald-600 text-white scale-110'
                        : 'bg-[#FFF0EB] text-[#E8623D] hover:bg-[#E8623D] hover:text-white shadow-xs'
                    }`}
                    title="Add to Cart"
                  >
                    {addedIds[product.id] ? (
                      <Check className="w-5 h-5" />
                    ) : (
                      <Plus className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
