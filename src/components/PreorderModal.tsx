'use client';

import React, { useState } from 'react';
import { useCartBooking, BookingData } from '@/context/CartBookingContext';

export default function PreorderModal() {
  const {
    cart,
    cartTotal,
    isPreorderOpen,
    closePreorderModal,
    saveBooking,
    clearCart,
  } = useCartBooking();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('08:00');
  const [guests, setGuests] = useState('2');
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<BookingData | null>(null);

  const money = (n: number) => n.toLocaleString('vi-VN') + 'đ';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Vui lòng nhập họ và tên của bạn');
      return;
    }
    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!cleanPhone || !/^[0-9+]{9,13}$/.test(cleanPhone)) {
      setError('Số điện thoại không hợp lệ (9 - 11 chữ số)');
      return;
    }
    if (!date) {
      setError('Vui lòng chọn ngày đến');
      return;
    }
    if (!time) {
      setError('Vui lòng chọn giờ hẹn');
      return;
    }

    const bookingPayload: BookingData = {
      name: name.trim(),
      phone: cleanPhone,
      date,
      time,
      guests,
      note: note.trim(),
      items: [...cart],
      total: cartTotal,
      createdAt: new Date().toISOString(),
    };

    saveBooking(bookingPayload);
    setConfirmedBooking(bookingPayload);
    setIsSuccess(true);
    clearCart();
    setError(null);
  };

  const handleClose = () => {
    setIsSuccess(false);
    setConfirmedBooking(null);
    closePreorderModal();
  };

  if (!isPreorderOpen) return null;

  return (
    <>
      <div
        id="po-overlay"
        className="po-overlay"
        aria-hidden="true"
        onClick={handleClose}
      />
      <div
        id="preorder-modal"
        className="preorder-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="po-modal-title"
      >
        <div className="po-modal-inner">
          <div className="po-modal-head">
            <div>
              <h2 className="po-modal-title" id="po-modal-title">
                Đặt bàn &amp; Đặt trước đồ uống
              </h2>
              <p className="po-modal-subtitle">
                Đến quán đúng giờ — nhân viên đã chuẩn bị sẵn bàn và đồ uống cho bạn.
              </p>
            </div>
            <button
              id="po-close"
              type="button"
              className="po-close"
              aria-label="Đóng"
              onClick={handleClose}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                aria-hidden="true"
                width="20"
                height="20"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {!isSuccess ? (
            <>
              {/* Order summary */}
              <div className="po-summary">
                <p className="po-summary-label">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <path d="M16 10a4 4 0 0 1-8 0" />
                  </svg>
                  Đồ uống bạn đã chọn
                </p>
                <ul id="po-items-list" className="po-items-list">
                  {cart.map((item) => (
                    <li key={item.id}>
                      <span>
                        {item.name} <strong>x{item.qty}</strong>
                      </span>
                      <span>{money(item.qty * item.price)}</span>
                    </li>
                  ))}
                </ul>
                <div className="po-summary-total">
                  Tổng cộng: <strong id="po-total">{money(cartTotal)}</strong>
                </div>
              </div>

              {/* Form */}
              <form id="po-form" className="po-form" onSubmit={handleSubmit} noValidate>
                <p className="po-form-label">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  Thông tin đặt bàn
                </p>

                <div className="po-field-row">
                  <div className="po-field">
                    <label htmlFor="po-name">Họ và tên *</label>
                    <input
                      id="po-name"
                      name="name"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="po-field">
                    <label htmlFor="po-phone">Số điện thoại *</label>
                    <input
                      id="po-phone"
                      name="phone"
                      type="tel"
                      placeholder="0912 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="po-field-row">
                  <div className="po-field">
                    <label htmlFor="po-date">Ngày đến *</label>
                    <input
                      id="po-date"
                      name="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      required
                    />
                  </div>
                  <div className="po-field">
                    <label htmlFor="po-time">Giờ đến *</label>
                    <input
                      id="po-time"
                      name="time"
                      type="time"
                      min="07:00"
                      max="22:00"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="po-field">
                  <label htmlFor="po-guests">Số khách</label>
                  <select
                    id="po-guests"
                    name="guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">1 khách</option>
                    <option value="2">2 khách</option>
                    <option value="3">3 khách</option>
                    <option value="4">4 khách</option>
                    <option value="5">5 khách</option>
                    <option value="6+">6+ khách</option>
                  </select>
                </div>

                <div className="po-field">
                  <label htmlFor="po-note">Ghi chú thêm (tuỳ chọn)</label>
                  <textarea
                    id="po-note"
                    name="note"
                    rows={2}
                    placeholder="Ví dụ: bàn ngoài sân, không đường, dị ứng..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </div>

                {error && (
                  <div id="po-error" className="po-error" role="alert" style={{ display: 'block', color: '#ff6b6b', marginBottom: '12px' }}>
                    {error}
                  </div>
                )}

                <button type="submit" className="btn po-submit">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    width="18"
                    height="18"
                    aria-hidden="true"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Xác nhận đặt bàn &amp; Đặt trước món
                </button>
              </form>
            </>
          ) : (
            <div id="po-success" className="po-success" role="status">
              <div className="po-success-icon" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="48"
                  height="48"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              </div>
              <h3 className="po-success-title">Đặt thành công! Hẹn gặp bạn ☕</h3>
              <p className="po-success-sub">
                Nhân viên sẽ chuẩn bị sẵn bàn và đồ uống trước khi bạn đến.
              </p>
              {confirmedBooking && (
                <div className="po-confirm-card">
                  <div className="po-confirm-row">
                    <span>Tên:</span>
                    <strong>{confirmedBooking.name}</strong>
                  </div>
                  <div className="po-confirm-row">
                    <span>Ngày:</span>
                    <strong>{confirmedBooking.date}</strong>
                  </div>
                  <div className="po-confirm-row">
                    <span>Giờ:</span>
                    <strong>{confirmedBooking.time}</strong>
                  </div>
                  <div className="po-confirm-row">
                    <span>Số khách:</span>
                    <strong>{confirmedBooking.guests}</strong>
                  </div>
                  {confirmedBooking.items && (
                    <div className="po-confirm-row po-confirm-items-row">
                      <span>Đồ uống:</span>
                      <pre className="po-confirm-items">
                        {confirmedBooking.items.map((i) => `${i.name} x${i.qty} (${money(i.price * i.qty)})\n`).join('')}
                      </pre>
                    </div>
                  )}
                  <div className="po-confirm-row po-confirm-total-row">
                    <span>Tổng:</span>
                    <strong>{money(confirmedBooking.total || 0)}</strong>
                  </div>
                </div>
              )}
              <p className="po-success-note">
                💡 Thông tin đã lưu trên trình duyệt này. Báo tên khi đến quán để nhân viên phục vụ nhanh hơn.
              </p>
              <button
                type="button"
                className="btn btn-outline po-close-success"
                onClick={handleClose}
              >
                Đóng
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
