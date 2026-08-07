import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  lastAddedProduct: Product | null;
  showToast: boolean;
  closeToast: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    return [
      {
        product: {
          id: 'minimalist-desk-lamp',
          name: 'Minimalist Desk Lamp',
          subtitle: 'Adjustable light temperature and brightness',
          category: 'Lighting',
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80',
          description: 'Elevate your workspace with this ultra-sleek desk lamp.',
          tags: ['lighting', 'desk'],
          rating: 4.8,
          reviewsCount: 124
        },
        quantity: 1
      },
      {
        product: {
          id: 'smart-coffee-mug',
          name: 'Smart Coffee Mug',
          subtitle: 'Keeps your drink at 135°F all day long',
          category: 'Home',
          price: 89.99,
          image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
          description: 'Never drink cold coffee or lukewarm tea again.',
          tags: ['coffee', 'mug'],
          rating: 4.9,
          reviewsCount: 208
        },
        quantity: 1
      }
    ];
  });

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState<Product | null>(null);
  const [showToast, setShowToast] = useState(false);

  const addToCart = (product: Product, quantity = 1) => {
    setItems((prevItems) => {
      const existing = prevItems.find((item) => item.product.id === product.id);
      if (existing) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { product, quantity }];
    });

    setLastAddedProduct(product);
    setShowToast(true);
  };

  const removeFromCart = (productId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const closeToast = () => {
    setShowToast(false);
  };

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const totalItemsCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemsCount,
        subtotal,
        shipping,
        tax,
        total,
        isCheckoutOpen,
        setIsCheckoutOpen,
        lastAddedProduct,
        showToast,
        closeToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
