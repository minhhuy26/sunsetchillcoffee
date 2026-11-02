'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

export interface BookingData {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  note?: string;
  items?: CartItem[];
  total?: number;
  createdAt?: string;
}

interface CartBookingContextType {
  cart: CartItem[];
  booking: BookingData | null;
  isDrawerOpen: boolean;
  drawerTab: 'cart' | 'booking';
  isPreorderOpen: boolean;
  isPreorderSuccess: boolean;
  preorderSuccessData: BookingData | null;
  toastMessage: string | null;
  cartCount: number;
  cartTotal: number;
  addToCart: (item: { id?: string; name: string; price: number }) => void;
  updateQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  saveBooking: (data: BookingData) => void;
  cancelBooking: () => void;
  openDrawer: (tab?: 'cart' | 'booking') => void;
  closeDrawer: () => void;
  switchDrawerTab: (tab: 'cart' | 'booking') => void;
  openPreorderModal: () => void;
  closePreorderModal: () => void;
  showToast: (msg: string) => void;
}

const CART_KEY = 'sunset-chill-cart';
const BOOKING_KEY = 'sunset-chill-booking';
const PREORDER_KEY = 'sunset-chill-preorder';

const CartBookingContext = createContext<CartBookingContextType | undefined>(undefined);

export function CartBookingProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [booking, setBooking] = useState<BookingData | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'cart' | 'booking'>('cart');
  const [isPreorderOpen, setIsPreorderOpen] = useState(false);
  const [isPreorderSuccess, setIsPreorderSuccess] = useState(false);
  const [preorderSuccessData, setPreorderSuccessData] = useState<BookingData | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  // Clear toast after timeout
  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 2400);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Load from localStorage on client mount
  useEffect(() => {
    setMounted(true);
    try {
      const rawCart = localStorage.getItem(CART_KEY);
      if (rawCart) {
        setCart(JSON.parse(rawCart) || []);
      }
    } catch (e) {
      console.error('Error loading cart', e);
    }

    try {
      const rawPreorder = localStorage.getItem(PREORDER_KEY);
      if (rawPreorder) {
        const p = JSON.parse(rawPreorder);
        if (p && p.booking) {
          setBooking({
            ...p.booking,
            items: p.items || [],
            total: p.total || 0,
            createdAt: p.createdAt,
          });
          return;
        }
      }
      const rawBooking = localStorage.getItem(BOOKING_KEY);
      if (rawBooking) {
        const b = JSON.parse(rawBooking);
        if (b && b.name) setBooking(b);
      }
    } catch (e) {
      console.error('Error loading booking', e);
    }
  }, []);

  // Save cart changes
  const saveCartToStorage = useCallback((newCart: CartItem[]) => {
    setCart(newCart);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(newCart));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const addToCart = useCallback(
    (item: { id?: string; name: string; price: number }) => {
      const id = item.id || item.name.toLowerCase().replace(/[^a-z0-9]/g, '-');
      setCart((prev) => {
        const existing = prev.find((i) => i.id === id || i.name === item.name);
        let updated: CartItem[];
        if (existing) {
          updated = prev.map((i) =>
            i.id === existing.id ? { ...i, qty: i.qty + 1 } : i
          );
        } else {
          updated = [...prev, { id, name: item.name, price: item.price, qty: 1 }];
        }
        try {
          localStorage.setItem(CART_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
      showToast(`Đã thêm: ${item.name}`);
    },
    [showToast]
  );

  const updateQty = useCallback(
    (id: string, delta: number) => {
      setCart((prev) => {
        const updated = prev
          .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
          .filter((i) => i.qty > 0);
        try {
          localStorage.setItem(CART_KEY, JSON.stringify(updated));
        } catch (e) {
          console.error(e);
        }
        return updated;
      });
    },
    []
  );

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
    showToast('Đã xóa món khỏi giỏ');
  }, [showToast]);

  const clearCart = useCallback(() => {
    setCart([]);
    try {
      localStorage.setItem(CART_KEY, JSON.stringify([]));
    } catch (e) {
      console.error(e);
    }
    showToast('Đã xóa toàn bộ giỏ hàng');
  }, [showToast]);

  const saveBooking = useCallback((data: BookingData) => {
    setBooking(data);
    try {
      if (data.items && data.items.length > 0) {
        localStorage.setItem(
          PREORDER_KEY,
          JSON.stringify({
            booking: {
              name: data.name,
              phone: data.phone,
              date: data.date,
              time: data.time,
              guests: data.guests,
              note: data.note,
            },
            items: data.items,
            total: data.total || 0,
            createdAt: new Date().toISOString(),
          })
        );
      } else {
        localStorage.setItem(BOOKING_KEY, JSON.stringify(data));
      }
    } catch (e) {
      console.error(e);
    }
    showToast('Đặt bàn thành công!');
  }, [showToast]);

  const cancelBooking = useCallback(() => {
    setBooking(null);
    try {
      localStorage.removeItem(BOOKING_KEY);
      localStorage.removeItem(PREORDER_KEY);
    } catch (e) {
      console.error(e);
    }
    showToast('Đã hủy thông tin đặt bàn');
  }, [showToast]);

  const openDrawer = useCallback((tab: 'cart' | 'booking' = 'cart') => {
    setDrawerTab(tab);
    setIsDrawerOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setIsDrawerOpen(false);
  }, []);

  const switchDrawerTab = useCallback((tab: 'cart' | 'booking') => {
    setDrawerTab(tab);
  }, []);

  const openPreorderModal = useCallback(() => {
    setIsPreorderSuccess(false);
    setIsPreorderOpen(true);
  }, []);

  const closePreorderModal = useCallback(() => {
    setIsPreorderOpen(false);
    setIsPreorderSuccess(false);
  }, []);

  // Global click delegate for [data-add] or [data-name] elements
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const addBtn = target.closest('[data-add]') as HTMLElement;
      if (addBtn) {
        const name = addBtn.getAttribute('data-name');
        const priceStr = addBtn.getAttribute('data-price');
        const id = addBtn.getAttribute('data-add') || undefined;
        if (name && priceStr) {
          e.preventDefault();
          addToCart({ id, name, price: parseInt(priceStr, 10) || 0 });
        }
      }
    };

    document.addEventListener('click', handleDocumentClick);
    return () => document.removeEventListener('handleDocumentClick', handleDocumentClick);
  }, [addToCart]);

  const cartCount = mounted ? cart.reduce((sum, item) => sum + item.qty, 0) : 0;
  const cartTotal = mounted ? cart.reduce((sum, item) => sum + item.qty * item.price, 0) : 0;

  return (
    <CartBookingContext.Provider
      value={{
        cart: mounted ? cart : [],
        booking: mounted ? booking : null,
        isDrawerOpen,
        drawerTab,
        isPreorderOpen,
        isPreorderSuccess,
        preorderSuccessData,
        toastMessage,
        cartCount,
        cartTotal,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        saveBooking,
        cancelBooking,
        openDrawer,
        closeDrawer,
        switchDrawerTab,
        openPreorderModal,
        closePreorderModal,
        showToast,
      }}
    >
      {children}
    </CartBookingContext.Provider>
  );
}

export function useCartBooking() {
  const ctx = useContext(CartBookingContext);
  if (!ctx) {
    throw new Error('useCartBooking must be used within CartBookingProvider');
  }
  return ctx;
}
