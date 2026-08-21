import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Plus, Check } from 'lucide-react';
import type { Product } from '../data/products';
import { useCart } from '../context/CartContext';
import { askRAG } from '../services/Ragapi';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  recommendedProducts?: Product[];
  timestamp: Date;
}

interface AIAssistantOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export const AIAssistantOverlay: React.FC<AIAssistantOverlayProps> = ({
  isOpen,
  onClose,
  onToggle,
}) => {
  const { addToCart } = useCart();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: "Hi! Tell me what you're looking for and I'll help you find it.",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [threadId] = useState<string>(() => {
    const existing = sessionStorage.getItem('rag_thread_id');
    if (existing) return existing;
    const id = crypto.randomUUID();
    sessionStorage.setItem('rag_thread_id', id);
    return id;
  });
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleAddProduct = (product: Product) => {
    addToCart(product, 1);

    setAddedIds((prev) => ({
      ...prev,
      [product.id]: true,
    }));

    setTimeout(() => {
      setAddedIds((prev) => ({
        ...prev,
        [product.id]: false,
      }));
    }, 2000);
  };

  const sendMessage = async () => {
    const userMsgText = input.trim();

    if (!userMsgText || isLoading) {
      return;
    }

    setInput('');

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userMsgText,
      timestamp: new Date(),
    };
  
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // The frontend sends only the user's message.
      // Product data and the Hugging Face API key stay in the backend.
      const result = await askRAG(userMsgText, threadId);

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: result.answer,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('RAG API Error:', error);

      setMessages((prev) => [
        ...prev,
        {
          id: `asst-${Date.now()}`,
          sender: 'assistant',
          text: "Sorry, I'm having trouble connecting to the AI assistant right now. Please try again.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#E8623D] text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-[#D54F2B] hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#E8623D]/30"
        aria-label="Toggle AI Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <Sparkles className="w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
          </div>
        )}
      </button>

      {/* Floating Chat Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 max-h-[560px] h-[520px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-scaleIn">
          {/* Header */}
          <div className="bg-slate-900 text-white px-5 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-[#E8623D] flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>

              <div>
                <h3 className="font-bold text-sm leading-none text-white">
                  AI Assistant
                </h3>

                <div className="flex items-center space-x-1.5 mt-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-xs text-gray-300">
                    Online • RAG Assistant
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-gray-400 hover:text-white transition-colors"
              aria-label="Close AI Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Message Thread */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50/50 custom-scrollbar">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${
                  msg.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#E8623D] text-white rounded-br-none shadow-xs'
                      : 'bg-white text-slate-800 border border-gray-100 rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>

                {/* Product cards can still be rendered if the backend
                    is later extended to return recommended product IDs. */}
                {msg.recommendedProducts &&
                  msg.recommendedProducts.length > 0 && (
                    <div className="mt-3 space-y-2.5 w-full max-w-[90%]">
                      {msg.recommendedProducts.map((product) => (
                        <div
                          key={product.id}
                          className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between gap-3 hover:border-[#E8623D]/40 transition-colors"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover bg-gray-100 flex-shrink-0"
                          />

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-xs font-semibold text-[#E8623D]">
                              ${product.price.toFixed(2)}
                            </p>
                          </div>

                          <button
                            onClick={() => handleAddProduct(product)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                              addedIds[product.id]
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#FFF0EB] text-[#E8623D] hover:bg-[#E8623D] hover:text-white'
                            }`}
                          >
                            {addedIds[product.id] ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Added</span>
                              </>
                            ) : (
                              <>
                                <Plus className="w-3.5 h-3.5" />
                                <span>Add</span>
                              </>
                            )}
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center space-x-2 text-gray-400 text-xs py-2">
                <Sparkles className="w-4 h-4 text-[#E8623D] animate-spin" />
                <span>AI is searching the store knowledge base...</span>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Input & Send */}
          <div className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              placeholder="e.g. 'something for hydration' or 'desk light'..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  sendMessage();
                }
              }}
              disabled={isLoading}
              className="flex-1 px-3.5 py-2 bg-gray-100 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#E8623D]/30 border border-transparent focus:border-[#E8623D] transition-all"
            />

            <button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="p-2.5 bg-[#E8623D] text-white rounded-xl hover:bg-[#D54F2B] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};