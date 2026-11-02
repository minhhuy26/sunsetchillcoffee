'use client';

import React from 'react';
import Link from 'next/link';
import { useCartBooking } from '@/context/CartBookingContext';

export default function CartDrawer() {
  const {
    cart,
    booking,
    isDrawerOpen,
    drawerTab,
    closeDrawer,
    switchDrawerTab,
    updateQty,
    removeFromCart,
    clearCart,
    cartTotal,
    openPreorderModal,
    cancelBooking,
  } = useCartBooking();

  const money = (n: number) => n.toLocaleString('vi-VN') + 'đ';

  return (
    <>
      <div
        id="cart-overlay"
        className={`cart-overlay ${isDrawerOpen ? 'is-open' : ''}`}
        aria-hidden="true"
        hidden={!isDrawerOpen}
        onClick={closeDrawer}
      />

      <aside
        className={`cart-drawer ${isDrawerOpen ? 'is-open' : ''}`}
        id="cart-drawer"
        aria-hidden={!isDrawerOpen}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-heading"
      >
        <div className="cart-drawer-head">
          <div className="drawer-tabs" role="tablist" aria-label="Đơn món và bàn đặt">
            <button
              type="button"
              className={`drawer-tab ${drawerTab === 'cart' ? 'is-active' : ''}`}
              id="tab-cart"
              role="tab"
              aria-selected={drawerTab === 'cart'}
              aria-controls="pane-cart"
              onClick={() => switchDrawerTab('cart')}
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
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
              <span>Giỏ món</span>
            </button>
            <button
              type="button"
              className={`drawer-tab ${drawerTab === 'booking' ? 'is-active' : ''}`}
              id="tab-booking"
              role="tab"
              aria-selected={drawerTab === 'booking'}
              aria-controls="pane-booking"
              onClick={() => switchDrawerTab('booking')}
            >
              <svg
                viewBox="0 0 24 24"
                width="15"
                height="15"
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
              <span>Bàn đã đặt ({booking ? 1 : 0})</span>
            </button>
          </div>
          <button
            className="cart-close"
            type="button"
            aria-label="Đóng cửa sổ"
            onClick={closeDrawer}
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {/* Tab Pane 1: Cart Items */}
        <div
          className={`drawer-pane ${drawerTab === 'cart' ? 'is-active' : ''}`}
          id="pane-cart"
          role="tabpanel"
          aria-labelledby="tab-cart"
          hidden={drawerTab !== 'cart'}
        >
          <p className="cart-note">
            Thêm món → chọn <strong>Đặt bàn &amp; Đặt trước món</strong> → đến quán là có sẵn!
          </p>

          <ul className="cart-items" id="cart-items">
            {cart.length === 0 ? (
              <li className="empty-cart">Giỏ còn trống. Thêm món nổi bật hoặc trong menu nhé.</li>
            ) : (
              cart.map((item) => (
                <li key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                  <div>
                    <strong style={{ display: 'block', fontSize: '15px' }}>{item.name}</strong>
                    <span style={{ fontSize: '13px', color: '#d49a3d' }}>{money(item.price)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'inline-flex', alignItems: 'center', background: 'rgba(255,255,255,0.08)', borderRadius: '6px' }}>
                      <button
                        type="button"
                        style={{ background: 'none', border: 'none', color: '#fff', padding: '4px 8px', cursor: 'pointer', fontSize: '14px' }}
                        onClick={() => updateQty(item.id, -1)}
                        aria-label="Giảm"
                      >
                        -
                      </button>
                      <span style={{ padding: '0 6px', fontSize: '13px' }}>{item.qty}</span>
                      <button
                        type="button"
                        style={{ background: 'none', border: 'none', color: '#fff', padding: '4px 8px', cursor: 'pointer', fontSize: '14px' }}
                        onClick={() => updateQty(item.id, 1)}
                        aria-label="Tăng"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#ff6b6b', cursor: 'pointer', padding: '4px' }}
                      onClick={() => removeFromCart(item.id)}
                      title="Xóa món"
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>

          <div className="cart-footer">
            <p className="cart-total">
              Tổng: <strong id="cart-total">{money(cartTotal)}</strong>
            </p>
            <button
              className="btn"
              type="button"
              id="cart-checkout"
              onClick={() => {
                if (cart.length === 0) {
                  alert('Giỏ hàng đang trống — hãy thêm món trước nhé!');
                  return;
                }
                openPreorderModal();
              }}
            >
              🗓 Đặt bàn &amp; Đặt trước món
            </button>
            <button
              className="btn btn-ghost"
              type="button"
              id="cart-clear"
              onClick={clearCart}
            >
              Xóa giỏ
            </button>
          </div>
        </div>

        {/* Tab Pane 2: Booking Info */}
        <div
          className={`drawer-pane ${drawerTab === 'booking' ? 'is-active' : ''}`}
          id="pane-booking"
          role="tabpanel"
          aria-labelledby="tab-booking"
          hidden={drawerTab !== 'booking'}
        >
          <div id="booking-content" className="booking-pane-content">
            {!booking ? (
              <div className="booking-empty">
                <div className="booking-empty-icon" aria-hidden="true">
                  <svg
                    viewBox="0 0 24 24"
                    width="44"
                    height="44"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                </div>
                <h3 className="booking-empty-title">Chưa có bàn đặt</h3>
                <p className="booking-empty-desc">
                  Bạn chưa có lịch hẹn đặt bàn nào được lưu trên thiết bị này.
                </p>
                <div className="booking-empty-sub">
                  💡 <strong>Mẹo hay:</strong> Bạn có thể chọn món tại trang Menu rồi bấm{' '}
                  <em>&quot;Đặt bàn &amp; Đặt trước món&quot;</em> — khi tới quán là mọi thứ đã chuẩn bị sẵn sàng!
                </div>
                <div className="booking-empty-actions">
                  <Link
                    href="/dat-ban"
                    className="btn btn-sm"
                    id="btn-empty-book"
                    onClick={closeDrawer}
                  >
                    Đi đến trang đặt bàn →
                  </Link>
                </div>
              </div>
            ) : (
              <div className="booking-card-detail">
                <div className="booking-status-tag">
                  <span className="status-pulse-dot" aria-hidden="true"></span>
                  <span>Đã xác nhận · Quán sẵn sàng đón bạn</span>
                </div>

                <div className="booking-primary-info">
                  <h3 className="b-name">{booking.name}</h3>
                  <span className="b-guests-pill">{booking.guests} khách</span>
                </div>

                <div className="booking-info-grid">
                  <div className="b-grid-row">
                    <span className="b-label">📞 Điện thoại:</span>
                    <strong className="b-val">
                      <a href={`tel:${booking.phone}`}>{booking.phone}</a>
                    </strong>
                  </div>
                  <div className="b-grid-row">
                    <span className="b-label">📅 Ngày đến:</span>
                    <strong className="b-val">{booking.date}</strong>
                  </div>
                  <div className="b-grid-row">
                    <span className="b-label">⏰ Giờ hẹn:</span>
                    <strong className="b-val">{booking.time}</strong>
                  </div>
                  {booking.note && (
                    <div className="b-grid-row b-note-row">
                      <span className="b-label">📝 Ghi chú:</span>
                      <span className="b-val">{booking.note}</span>
                    </div>
                  )}
                </div>

                {booking.items && booking.items.length > 0 && (
                  <div className="b-preorder-section">
                    <div className="b-preorder-header">
                      <svg
                        viewBox="0 0 24 24"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <path d="M16 10a4 4 0 0 1-8 0" />
                      </svg>
                      <span>Món đã đặt trước ({booking.items.length}):</span>
                    </div>
                    <ul className="b-preorder-items">
                      {booking.items.map((i) => (
                        <li key={i.id}>
                          <span className="b-item-name">
                            {i.name} <strong>x{i.qty}</strong>
                          </span>
                          <span className="b-item-price">{money(i.qty * i.price)}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="b-preorder-sum">
                      <span>Tổng tiền đồ uống:</span>
                      <strong>{money(booking.total || 0)}</strong>
                    </div>
                  </div>
                )}

                <div className="booking-storage-callout">
                  <svg
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="16" x2="12" y2="12" />
                    <line x1="12" y1="8" x2="12.01" y2="8" />
                  </svg>
                  <div>
                    <strong>Lưu trên thiết bị này:</strong> Khi đến quán Sunset Chill, chỉ cần báo tên{' '}
                    <em>&quot;{booking.name}&quot;</em> hoặc SĐT <em>&quot;{booking.phone}&quot;</em>, nhân viên đã giữ bàn và đồ uống sẵn sàng.
                  </div>
                </div>

                <div className="booking-card-actions">
                  <button
                    type="button"
                    className="btn btn-ghost b-cancel-btn"
                    id="btn-cancel-booking"
                    onClick={cancelBooking}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                    </svg>
                    Hủy lịch đặt bàn này
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
