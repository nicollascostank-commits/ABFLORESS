import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  totalItems: number;
  subtotalNumeric: number;
  formattedTotalText: string;
  hasConsultationItems: boolean;
  customerName: string;
  setCustomerName: (name: string) => void;
  lastAddedProductId: string | null;
}

const CART_STORAGE_KEY = 'ab_flores_cart_v1';
const CUSTOMER_NAME_KEY = 'ab_flores_customer_name';

const LEGACY_IMAGE_MIGRATIONS: Record<string, string> = {
  '/assets/aistudio/c143b3a5-a759-4c29-9cf5-45f9a21f2369_8395d300.jpeg':
    '/assets/aistudio/ceb17082-106e-436b-a3f8-1e9c713900cd_071cec54.jpeg',
  '/assets/aistudio/7c9085b9-aa3b-4ea3-a831-a06acb4afce5_8a68b874.jpeg':
    '/assets/aistudio/da6c3374-f8c9-4b39-af63-8d679303d700_07567cf0.jpeg',
  '/assets/aistudio/e35160db-9093-42b3-b635-39556772b3ee_aad031c2.jpeg':
    '/assets/aistudio/bdfaa983-b310-4002-abcc-e22a252fae4b_0ab7a21d.jpeg',
  '/assets/aistudio/92e32863-e7a9-4fdb-b302-26cef39da458_419cb645.jpeg':
    '/assets/aistudio/ddeb1465-46c0-4806-b95a-c928dfb0ef94_ad0ff25e.jpeg',
  '/assets/aistudio/a70412f6-b360-4b81-9b6d-8c6ee3059b8f_d6b70505.jpeg':
    '/assets/aistudio/ff93e7db-86bc-48d3-9aae-4c09be9d9acb_0977ad33.jpeg',
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed
            .filter(
              (item) =>
                item &&
                item.product &&
                typeof item.product.id === 'string' &&
                typeof item.quantity === 'number'
            )
            .map((item) => {
              const migrated = item.product?.image
                ? LEGACY_IMAGE_MIGRATIONS[item.product.image]
                : undefined;
              return migrated
                ? { ...item, product: { ...item.product, image: migrated } }
                : item;
            });
        }
      }
    } catch {
      // Fallback if localStorage is unavailable
    }
    return [];
  });

  const [customerName, setCustomerName] = useState<string>(() => {
    try {
      return localStorage.getItem(CUSTOMER_NAME_KEY) || '';
    } catch {
      return '';
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastAddedProductId, setLastAddedProductId] = useState<string | null>(null);

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore write errors
    }
  }, [cart]);

  // Sync customer name to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CUSTOMER_NAME_KEY, customerName);
    } catch {
      // Ignore write errors
    }
  }, [customerName]);

  const addToCart = (product: Product, quantity: number = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }
      return [...prev, { product, quantity: Math.max(1, quantity) }];
    });

    setLastAddedProductId(product.id);
    setTimeout(() => {
      setLastAddedProductId((curr) => (curr === product.id ? null : curr));
    }, 2200);

    // Auto open drawer so user sees item added
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  // Calculations
  const totalItems = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  const { subtotalNumeric, hasConsultationItems, hasPricedItems } = useMemo(() => {
    let numeric = 0;
    let consultation = false;
    let priced = false;

    cart.forEach((item) => {
      if (typeof item.product.price === 'number' && item.product.price > 0) {
        numeric += item.product.price * item.quantity;
        priced = true;
      } else {
        consultation = true;
      }
    });

    return {
      subtotalNumeric: numeric,
      hasConsultationItems: consultation,
      hasPricedItems: priced,
    };
  }, [cart]);

  const formattedTotalText = useMemo(() => {
    if (cart.length === 0) return 'R$ 0,00';
    if (hasPricedItems && !hasConsultationItems) {
      return `R$ ${subtotalNumeric.toFixed(2).replace('.', ',')}`;
    }
    if (hasPricedItems && hasConsultationItems) {
      return `R$ ${subtotalNumeric.toFixed(2).replace('.', ',')} (+ itens a consultar)`;
    }
    return 'Preço a consultar';
  }, [cart.length, hasPricedItems, hasConsultationItems, subtotalNumeric]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        isCartOpen,
        openCart,
        closeCart,
        totalItems,
        subtotalNumeric,
        formattedTotalText,
        hasConsultationItems,
        customerName,
        setCustomerName,
        lastAddedProductId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
