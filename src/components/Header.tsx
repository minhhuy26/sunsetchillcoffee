'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCartBooking } from '@/context/CartBookingContext';

export default function Header() {
  const pathname = usePathname();
  const { cartCount, booking, openDrawer } = useCartBooking();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Trang chủ' },
    { href: '/gioi-thieu', label: 'Giới thiệu' },
    { href: '/mon-noi-bat', label: 'Món nổi bật' },
    { href: '/menu', label: 'Menu' },
    { href: '/khong-gian', label: 'Không gian' },
    { href: '/blog', label: 'Cẩm nang' },
    { href: '/dat-ban', label: 'Đặt bàn' },
    { href: '/dia-chi', label: 'Địa chỉ' },
  ];

  const hasBooking = Boolean(booking);

  return (
    <header className="site-header">
      <Link href="/" className="logo" aria-label="Sunset Chill Café Đà Lạt Hoàng Diệu - Về trang chủ">
        <svg
          className="logo-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" y1="2" x2="6" y2="4" />
          <line x1="10" y1="2" x2="10" y2="4" />
          <line x1="14" y1="2" x2="14" y2="4" />
        </svg>
        <div>
          <span className="logo-text">Sunset Chill</span>
          <span className="logo-sub">Đà Lạt · Hoàng Diệu</span>
        </div>
      </Link>

      <button
        className={`nav-toggle ${isMobileNavOpen ? 'is-active' : ''}`}
        type="button"
        aria-label={isMobileNavOpen ? 'Đóng menu' : 'Mở menu'}
        aria-expanded={isMobileNavOpen}
        aria-controls="main-nav"
        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </button>

      <nav
        className={`main-nav ${isMobileNavOpen ? 'is-open' : ''}`}
        id="main-nav"
        aria-label="Điều hướng chính"
      >
        {navLinks.map((link) => {
          const isActive =
            link.href === '/'
              ? pathname === '/'
              : pathname === link.href || pathname.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${isActive ? 'is-active' : ''}`}
              onClick={() => setIsMobileNavOpen(false)}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <button
        className="booking-btn"
        id="booking-btn"
        type="button"
        aria-label={`Bàn đặt (${hasBooking ? 1 : 0})`}
        title="Xem bàn bạn đã đặt"
        onClick={() => openDrawer('booking')}
      >
        <svg
          className="booking-btn-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span>Bàn đặt</span>
        <span
          className={`booking-count ${hasBooking ? 'is-active' : ''}`}
          id="booking-count"
          aria-live="polite"
        >
          {hasBooking ? '1' : '0'}
        </span>
      </button>

      <button
        className="cart-btn"
        type="button"
        aria-label={`Giỏ hàng (${cartCount})`}
        onClick={() => openDrawer('cart')}
      >
        <svg
          className="cart-btn-icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <path d="M3 6h18" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
        <span>Giỏ hàng</span>
        <span className="cart-count" id="cart-count" aria-live="polite">
          {cartCount}
        </span>
      </button>
    </header>
  );
}
