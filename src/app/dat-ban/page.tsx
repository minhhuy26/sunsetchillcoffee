'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCartBooking } from '@/context/CartBookingContext';

export default function DatBanPage() {
  const { booking, saveBooking, cancelBooking, openDrawer, showToast } = useCartBooking();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('08:00');
  const [guests, setGuests] = useState('2');
  const [note, setNote] = useState('');

  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  // Set default date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setDate(today);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!name.trim() || name.trim().length < 2) {
      setFormError('Vui lòng nhập họ và tên của bạn (ít nhất 2 ký tự).');
      return;
    }

    const cleanPhone = phone.trim().replace(/\s+/g, '');
    if (!/^0[0-9]{9}$/.test(cleanPhone)) {
      setFormError('Số điện thoại không hợp lệ. Vui lòng nhập số di động 10 chữ số (bắt đầu bằng số 0).');
      return;
    }

    if (!date) {
      setFormError('Vui lòng chọn ngày đến.');
      return;
    }

    if (!time) {
      setFormError('Vui lòng chọn giờ hẹn.');
      return;
    }

    saveBooking({
      name: name.trim(),
      phone: cleanPhone,
      date,
      time,
      guests,
      note: note.trim(),
      createdAt: new Date().toISOString(),
    });

    setFormSuccess(
      `🎉 Đặt bàn thành công cho ${name}! Lịch hẹn của bạn vào lúc ${time} ngày ${date} đã được lưu trên thiết bị.`
    );
    showToast('Đặt bàn thành công!');
  };

  return (
    <main id="noi-dung">
      <div className="article-page" style={{ maxWidth: '1080px' }}>
        <nav className="breadcrumb" aria-label="Đường dẫn trang">
          <Link href="/">Trang chủ</Link>
          <span className="sep">/</span>
          <span>Đặt bàn</span>
        </nav>

        <header className="article-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
          <p className="eyebrow">Giữ Chỗ Trước — Hoàn Toàn Miễn Phí</p>
          <h1 style={{ fontSize: '38px', marginBottom: '16px' }}>
            Đặt Bàn Trực Tuyến Sunset Chill Café Đà Lạt
          </h1>
          <p style={{ color: 'var(--mau-chu-nhat)', fontSize: '18px', maxWidth: '760px', margin: '0 auto' }}>
            Để chúng mình chuẩn bị góc ngồi chu đáo nhất cho bạn, hãy điền thông tin bên dưới. Quán sẽ lưu thông tin và giữ bàn trong vòng 15 phút so với giờ hẹn.
          </p>
        </header>

        {/* Form Layout Section */}
        <section className="section-card" style={{ marginBottom: '40px', padding: '40px 36px' }}>
          <div className="form-layout">
            <div className="form-info-col">
              <p className="eyebrow">Lưu ý trước khi đặt</p>
              <h2 id="dat-ban-heading" style={{ fontSize: '28px', marginBottom: '16px' }}>
                Quy Định &amp; Chính Sách Giữ Bàn
              </h2>
              <p style={{ color: 'var(--mau-chu)', lineHeight: 1.6, marginBottom: '20px' }}>
                Sunset Chill Café không thu bất kỳ khoản phí đặt chỗ hay tiền cọc nào. Thông tin đặt chỗ của bạn sẽ được lưu trực tiếp trên hệ thống trình duyệt để bạn tiện kiểm tra khi đến quán.
              </p>
              <ul className="form-tips">
                <li>
                  <strong>Thời gian giữ chỗ:</strong> Quán sẽ giữ bàn tối đa 15 phút kể từ giờ bạn đã đặt. Nếu đến muộn hơn, vui lòng gọi điện thoại thông báo trước.
                </li>
                <li>
                  <strong>Khách nhóm đông (từ 6 người):</strong> Nên gửi thông tin đặt bàn trước ít nhất 2 giờ để nhân viên kịp ghép dãy bàn liền nhau.
                </li>
                <li>
                  <strong>Khung giờ cao điểm:</strong> 16h30 – 18h30 (ngắm hoàng hôn) và tối cuối tuần các bàn cửa sổ thường hết nhanh.
                </li>
                <li>
                  <strong>Khu vực thú cưng:</strong> Các bé cún/mèo vui lòng ngồi ở khu vực sân vườn ngoài trời thoáng đãng.
                </li>
              </ul>

              <div className="booking-hotline-card">
                <h3 style={{ fontSize: '16px', color: 'var(--mau-toi)', marginBottom: '6px' }}>
                  Cần Hỗ Trợ Đặt Bàn Gấp?
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--mau-chu)', marginBottom: '10px' }}>
                  Nếu bạn đang trên đường tới quán hoặc muốn đặt tiệc nhỏ/sinh nhật, hãy gọi trực tiếp hotline:
                </p>
                <a
                  href="tel:+84394728499"
                  style={{
                    fontSize: '19px',
                    fontWeight: 700,
                    color: '#8a6230',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  📞 0394 728 499
                </a>
              </div>
            </div>

            <div className="form-card-col">
              {/* Active Booking Banner */}
              {booking && (
                <div className="active-booking-banner" style={{ display: 'block', marginBottom: '20px' }}>
                  <div className="booking-banner-card">
                    <div className="b-banner-left">
                      <span className="b-banner-pill">🟢 Bàn bạn đã đặt trước</span>
                      <h4>{booking.name} · {booking.guests} khách</h4>
                      <p>
                        Hẹn lúc <strong>{booking.time}</strong> ngày <strong>{booking.date}</strong> (SĐT:{' '}
                        <a href={`tel:${booking.phone}`}>{booking.phone}</a>)
                      </p>
                    </div>
                    <div className="b-banner-right" style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                      <button
                        type="button"
                        className="btn btn-sm btn-outline"
                        id="btn-banner-view"
                        onClick={() => openDrawer('booking')}
                      >
                        Xem chi tiết bàn &amp; món
                      </button>
                      <button
                        type="button"
                        className="btn btn-sm btn-ghost"
                        id="btn-banner-cancel"
                        onClick={cancelBooking}
                      >
                        Hủy bàn
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Pre-order callout */}
              <div className="preorder-callout-card" style={{ marginBottom: '20px' }}>
                <strong>🛒 Bạn muốn quán chuẩn bị sẵn đồ uống khi đến?</strong>
                <span>
                  Thêm món vào giỏ hàng ở <Link href="/menu">trang Menu</Link> hoặc{' '}
                  <Link href="/#mon-noi-bat">Trang chủ</Link>, rồi chọn <em>Đặt bàn &amp; Đặt trước món</em> — đồ uống sẽ được pha tươi và dọn sẵn ngay khi bạn tới!
                </span>
              </div>

              {/* Booking Form */}
              <form id="booking-form" onSubmit={handleSubmit} noValidate aria-labelledby="dat-ban-heading">
                <label>
                  Họ và tên của bạn
                  <input
                    type="text"
                    name="name"
                    required
                    minLength={2}
                    maxLength={60}
                    autoComplete="name"
                    placeholder="Ví dụ: Nguyễn Minh Huy"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </label>

                <label>
                  Số điện thoại liên hệ
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="0394728499"
                    inputMode="numeric"
                    autoComplete="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </label>

                <div className="form-row">
                  <label>
                    Ngày hẹn
                    <input
                      type="date"
                      name="date"
                      id="booking-date"
                      required
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                  </label>
                  <label>
                    Giờ hẹn
                    <input
                      type="time"
                      name="time"
                      required
                      min="07:00"
                      max="22:00"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                    />
                  </label>
                </div>

                <label>
                  Số lượng khách
                  <select
                    name="guests"
                    required
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                  >
                    <option value="1">1 người (Góc yên tĩnh làm việc)</option>
                    <option value="2">2 người (Bàn đôi cửa sổ)</option>
                    <option value="3">3 người</option>
                    <option value="4">4 người (Bàn gia đình/nhóm bạn)</option>
                    <option value="5">5 người</option>
                    <option value="6">6+ người (Nhóm đông - gọi xác nhận)</option>
                  </select>
                </label>

                <label>
                  Yêu cầu góc ngồi / Ghi chú thêm
                  <textarea
                    name="note"
                    maxLength={300}
                    rows={3}
                    placeholder="Ví dụ: Bàn gần ổ cắm điện làm việc, bàn cạnh cửa sổ ngắm hoàng hôn, mang theo thú cưng..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </label>

                {formError && (
                  <p
                    className="form-error"
                    id="form-error"
                    role="alert"
                    aria-live="assertive"
                    style={{ display: 'block', color: '#ff6b6b', margin: '12px 0' }}
                  >
                    {formError}
                  </p>
                )}

                {formSuccess && (
                  <p
                    className="form-success"
                    id="form-success"
                    role="status"
                    aria-live="polite"
                    style={{
                      display: 'block',
                      color: '#2e7d32',
                      background: '#edf7ed',
                      padding: '12px',
                      borderRadius: '8px',
                      margin: '12px 0',
                    }}
                  >
                    {formSuccess}
                  </p>
                )}

                <button className="btn" type="submit" style={{ width: '100%', padding: '14px', fontSize: '16px' }}>
                  Xác Nhận Lưu Đặt Bàn
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* FAQ về đặt bàn */}
        <section className="section-card section-muted" style={{ marginBottom: '40px', padding: '36px 32px' }}>
          <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '24px' }}>
            Câu Hỏi Thường Gặp (FAQ)
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e0d0c0' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--mau-toi)', marginBottom: '6px' }}>
                1. Tôi có cần phải trả trước tiền đặt cọc không?
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--mau-chu)', lineHeight: 1.6 }}>
                Không. Sunset Chill hoàn toàn miễn phí giữ bàn cho khách hàng. Bạn chỉ cần thanh toán tiền đồ uống và bánh ngọt khi gọi món tại quầy.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e0d0c0' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--mau-toi)', marginBottom: '6px' }}>
                2. Nếu tôi đến trễ hơn giờ hẹn thì sao?
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--mau-chu)', lineHeight: 1.6 }}>
                Quán sẽ giữ bàn cho bạn trong vòng 15 phút. Sau 15 phút nếu quán quá đông và không liên lạc được với bạn, quán xin phép nhường bàn cho khách đang chờ. Nếu kẹt xe hoặc có việc bận, bạn vui lòng gọi 0394 728 499 để nhân viên giữ chỗ tiếp nhé.
              </p>
            </div>

            <div style={{ background: '#fff', padding: '20px', borderRadius: '10px', border: '1px solid #e0d0c0' }}>
              <h3 style={{ fontSize: '16px', color: 'var(--mau-toi)', marginBottom: '6px' }}>
                3. Quán có nhận mang bánh sinh nhật từ ngoài vào không?
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--mau-chu)', lineHeight: 1.6 }}>
                Có, bạn hoàn toàn có thể mang bánh sinh nhật và nến vào tổ chức cùng bạn bè. Quán sẽ hỗ trợ dĩa, dao cắt bánh và bật nhạc chúc mừng nếu bạn cần.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
