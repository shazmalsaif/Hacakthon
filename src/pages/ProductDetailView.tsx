import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, ShoppingBag, Truck, RefreshCw, ShieldCheck, Check, ArrowLeft, Star } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useCart } from '../context/CartContext';

export const ProductDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const product = PRODUCTS.find((p) => p.id === id) || PRODUCTS[0];

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="space-y-16">
      <div>
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-[#131D21] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-6 bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex items-center justify-center">
          <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-extrabold text-gray-800 uppercase tracking-wide">
              {product.category}
            </span>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-6 bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
          <div className="inline-block px-3 py-1 bg-[#FFF0EB] text-[#E8623D] font-bold text-xs rounded-full uppercase tracking-wider">
            {product.category}
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#131D21] leading-tight">
            {product.name}
          </h1>

          <div className="flex items-center gap-2 text-sm text-amber-500 font-semibold">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-gray-900 font-bold">{product.rating}</span>
            <span className="text-gray-400 font-normal">({product.reviewsCount} verified reviews)</span>
          </div>

          <div className="text-3xl font-black text-[#E8623D]">
            ${product.price.toFixed(2)}
          </div>

          <p className="text-gray-600 text-base leading-relaxed">
            {product.description}
          </p>

          {product.features && (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Key Features</h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-gray-700">
                {product.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E8623D]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold text-sm text-[#131D21]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 shadow-lg ${
                isAdded
                  ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                  : 'bg-[#E8623D] hover:bg-[#D54F2B] text-white shadow-[#E8623D]/25 hover:shadow-xl hover:-translate-y-0.5'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" />
                  <span>Add to Cart — ${(product.price * quantity).toFixed(2)}</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-6 border-t border-gray-100 text-xs text-gray-600 font-medium">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#E8623D]" />
              <span>Free Express Shipping</span>
            </div>
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-[#E8623D]" />
              <span>30-Day Hassle Returns</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#E8623D]" />
              <span>1-Year Warranty Included</span>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-[#131D21]">You Might Also Like</h2>
          <Link to="/" className="text-xs font-bold text-[#E8623D] hover:underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {relatedProducts.map((rel) => (
            <Link
              key={rel.id}
              to={`/product/${rel.id}`}
              className="group bg-white rounded-2xl p-4 border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3">
                  <img
                    src={rel.image}
                    alt={rel.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] font-bold text-gray-700">
                    {rel.category}
                  </span>
                </div>
                <h3 className="font-bold text-base text-[#131D21] group-hover:text-[#E8623D] transition-colors">
                  {rel.name}
                </h3>
                <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{rel.subtitle}</p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-gray-50">
                <span className="text-lg font-bold text-[#E8623D]">${rel.price.toFixed(2)}</span>
                <span className="text-xs font-semibold text-gray-500 group-hover:text-[#E8623D]">
                  View &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
