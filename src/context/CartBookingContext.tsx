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

  // Global click delegate for [data-add], .filter-btn, and [data-filter] elements
  useEffect(() => {
    // Setup date min for static booking date inputs if present
    const dateInput = document.querySelector('#booking-date, input[name="date"]') as HTMLInputElement;
    if (dateInput && !dateInput.min) {
      dateInput.min = new Date().toISOString().split('T')[0];
    }

    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Category filter buttons (.filter-btn or [data-filter])
      const filterBtn = target.closest('.filter-btn, [data-filter]') as HTMLElement;
      if (filterBtn) {
        const filterVal = filterBtn.getAttribute('data-filter');
        if (filterVal) {
          e.preventDefault();
          const container = filterBtn.closest('.section-card, section, main') || document;
          const allBtns = container.querySelectorAll('.filter-btn, [data-filter]');
          allBtns.forEach((btn) => {
            btn.classList.remove('is-active');
            btn.setAttribute('aria-pressed', 'false');
          });
          filterBtn.classList.add('is-active');
          filterBtn.setAttribute('aria-pressed', 'true');

          const categories = container.querySelectorAll('.danh-muc');
          categories.forEach((box) => {
            const cat = (box as HTMLElement).getAttribute('data-category');
            if (filterVal === 'all' || cat === filterVal) {
              box.classList.remove('is-hidden');
            } else {
              box.classList.add('is-hidden');
            }
          });
          return;
        }
      }

      // Add to cart buttons ([data-add])
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

    const handleFormSubmit = (e: SubmitEvent) => {
      const form = e.target as HTMLFormElement;
      if (!form || form.id !== 'booking-form') return;
      if (window.location.pathname === '/dat-ban') return;

      e.preventDefault();
      const fd = new FormData(form);
      const name = ((fd.get('name') as string) || '').trim();
      const phone = ((fd.get('phone') as string) || '').trim().replace(/\s+/g, '');
      const date = (fd.get('date') as string) || '';
      const time = (fd.get('time') as string) || '';
      const guests = (fd.get('guests') as string) || '2';
      const note = ((fd.get('note') as string) || '').trim();

      const err = form.querySelector('#form-error') as HTMLElement;
      const succ = form.querySelector('#form-success') as HTMLElement;
      if (err) err.hidden = true;
      if (succ) succ.hidden = true;

      if (!name || name.length < 2) {
        if (err) {
          err.textContent = 'Vui lòng nhập họ tên của bạn (tối thiểu 2 ký tự).';
          err.hidden = false;
        }
        return;
      }
      if (!/^0[0-9]{9}$/.test(phone)) {
        if (err) {
          err.textContent = 'Số điện thoại không hợp lệ (cần 10 chữ số bắt đầu bằng 0).';
          err.hidden = false;
        }
        return;
      }
      if (!date) {
        if (err) {
          err.textContent = 'Vui lòng chọn ngày đến.';
          err.hidden = false;
        }
        return;
      }
      if (!time) {
        if (err) {
          err.textContent = 'Vui lòng chọn giờ hẹn.';
          err.hidden = false;
        }
        return;
      }

      saveBooking({ name, phone, date, time, guests, note });
      if (succ) {
        succ.textContent = 'Đặt bàn thành công! Sunset Chill Café sẽ liên hệ xác nhận sớm nhất.';
        succ.hidden = false;
      }
      form.reset();
    };

    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('submit', handleFormSubmit);
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('submit', handleFormSubmit);
    };
  }, [addToCart, saveBooking]);

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
