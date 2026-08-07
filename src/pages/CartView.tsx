import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, ShoppingBag, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartView: React.FC = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    subtotal,
    tax,
    total,
    clearCart
  } = useCart();

  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
  };

  const handleConfirmOrder = () => {
    setIsOrderPlaced(true);
    setTimeout(() => {
      clearCart();
    }, 500);
  };

  return (
    <div className="space-y-8">
      {/* View Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#131D21]">Your Bag</h1>
        <span className="text-sm font-semibold text-gray-500">
          {items.reduce((sum, i) => sum + i.quantity, 0)} Items
        </span>
      </div>

      {items.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center space-y-6 border border-gray-100 shadow-sm">
          <div className="w-16 h-16 rounded-full bg-[#FFF0EB] text-[#E8623D] mx-auto flex items-center justify-center">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-[#131D21]">Your bag is empty</h2>
            <p className="text-gray-500 text-sm">Looks like you haven't added any fun gadgets yet.</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#E8623D] text-white font-bold rounded-2xl hover:bg-[#D54F2B] transition-all shadow-md shadow-[#E8623D]/25"
          >
            <span>Explore Products</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Line Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <Link to={`/product/${product.id}`} className="w-20 h-20 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#E8623D]">
                      {product.category}
                    </span>
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-bold text-base text-[#131D21] hover:text-[#E8623D] transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 sm:hidden">
                      ${product.price.toFixed(2)} each
                    </p>
                  </div>
                </div>

                {/* Right controls: Stepper, Price & Remove */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-100">
                  {/* Stepper */}
                  <div className="flex items-center bg-gray-100 rounded-xl p-1 border border-gray-200">
                    <button
                      onClick={() => updateQuantity(product.id, quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-9 text-center font-bold text-xs text-[#131D21]">
                      {quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-gray-700 hover:bg-gray-200 transition-colors"
                      title="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Line total price */}
                  <div className="text-right">
                    <span className="font-extrabold text-base text-[#E8623D]">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </div>

                  {/* Remove icon button */}
                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="p-2 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Order Summary Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm space-y-6 sticky top-28">
            <h2 className="text-xl font-extrabold text-[#131D21]">Order Summary</h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Shipping</span>
                <span className="font-semibold text-emerald-600">Free</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Estimated Tax (8%)</span>
                <span className="font-semibold text-gray-900">${tax.toFixed(2)}</span>
              </div>

              <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                <span className="font-bold text-lg text-[#131D21]">Total</span>
                <span className="font-black text-2xl text-[#E8623D]">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Full-width coral Checkout button */}
            <button
              onClick={handleCheckout}
              className="w-full py-4 bg-[#E8623D] hover:bg-[#D54F2B] text-white font-bold rounded-2xl transition-all shadow-lg shadow-[#E8623D]/25 hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2 text-base"
            >
              <span>Checkout</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-gray-400 font-medium pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Encrypted Mock Checkout Demo</span>
            </div>
          </div>
        </div>
      )}

      {/* Mock Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-6 shadow-2xl border border-gray-100 animate-scaleIn">
            {!isOrderPlaced ? (
              <>
                <div className="space-y-2 text-center">
                  <div className="w-12 h-12 bg-[#FFF0EB] text-[#E8623D] rounded-full mx-auto flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#131D21]">Hackathon Mock Checkout</h3>
                  <p className="text-xs text-gray-500">
                    No real payment will be charged. Click below to simulate instant order placement.
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl space-y-2 text-xs text-gray-700">
                  <div className="flex justify-between font-semibold">
                    <span>Order Items:</span>
                    <span>{items.reduce((sum, i) => sum + i.quantity, 0)} products</span>
                  </div>
                  <div className="flex justify-between font-bold text-[#E8623D] text-sm">
                    <span>Total Amount:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 text-xs transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmOrder}
                    className="flex-1 py-3 bg-[#E8623D] text-white font-bold rounded-xl hover:bg-[#D54F2B] text-xs transition-colors shadow-md"
                  >
                    Confirm Order
                  </button>
                </div>
              </>
            ) : (
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full mx-auto flex items-center justify-center animate-bounce">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-[#131D21]">Order Confirmed! 🎉</h3>
                  <p className="text-xs text-gray-500">
                    Thank you for testing the Fun Gadgets e-commerce hackathon demo!
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCheckoutModalOpen(false);
                    setIsOrderPlaced(false);
                  }}
                  className="w-full py-3.5 bg-[#131D21] text-white font-bold rounded-xl text-xs hover:bg-slate-800 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
