import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-grid">
          {/* Col 1: Brand & Bio */}
          <div className="footer-brand">
            <p className="footer-logo">
              Sunset Chill <span>Café</span>
            </p>
            <p className="footer-slogan">
              Nơi để bạn chậm lại và tận hưởng — cà phê rang mộc, không gian gỗ ấm và view sương chiều Đà Lạt.
            </p>
            <p style={{ fontSize: '14px', color: '#baa495', lineHeight: 1.6 }}>
              📍 123 Hoàng Diệu, P.5, TP. Đà Lạt<br />
              ⏰ Mở cửa: 07:00 – 22:00 (Hàng ngày)<br />
              📞 Hotline:{' '}
              <a href="tel:+84394728499" style={{ color: 'var(--mau-vang)', fontWeight: 700 }}>
                0394 728 499
              </a>
            </p>
          </div>

          {/* Col 2: Navigation */}
          <div className="footer-col">
            <h4>Khám Phá</h4>
            <nav className="footer-nav" aria-label="Liên kết chân trang">
              <Link href="/">Trang chủ</Link>
              <Link href="/gioi-thieu">Về chúng mình</Link>
              <Link href="/menu">Thực đơn &amp; Bảng giá</Link>
              <Link href="/mon-noi-bat">Món Signature</Link>
              <Link href="/khong-gian">Không gian quán</Link>
            </nav>
          </div>

          {/* Col 3: Dịch vụ & Cẩm nang */}
          <div className="footer-col">
            <h4>Cẩm Nang &amp; Hẹn</h4>
            <nav className="footer-nav" aria-label="Cẩm nang và liên hệ">
              <Link href="/blog">Cẩm nang cà phê Đà Lạt</Link>
              <Link href="/blog/ca-phe-rang-moc-da-lat-nguyen-chat">Cà phê rang mộc</Link>
              <Link href="/blog/arabica-cau-dat-linh-hon-ca-phe-da-lat">Arabica Cầu Đất</Link>
              <Link href="/dat-ban">Đặt bàn trực tuyến</Link>
              <Link href="/dia-chi">Chỉ đường đến quán</Link>
            </nav>
          </div>

          {/* Col 4: Social Entity & Technical Links */}
          <div className="footer-col">
            <h4>Kết Nối Mạng Xã Hội</h4>
            <p style={{ fontSize: '13.5px', color: '#baa495', marginBottom: '14px' }}>
              Theo dõi chúng mình trên các nền tảng chính thức:
            </p>
            <div className="footer-social" aria-label="Mạng xã hội Sunset Chill">
              <a
                href="https://www.facebook.com/share/p/1CF3pR17gj/"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </a>
              <a
                href="https://www.threads.com/share/BAcEboWWmG/"
                target="_blank"
                rel="noopener noreferrer"
                title="Threads"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.263 11.097c-.03-3.486-1.92-5.586-5.111-5.586-2.13 0-3.922.963-4.863 2.499l2.062 1.438c.535-.843 1.272-1.543 2.628-1.543 1.528 0 2.318.85 2.544 2.431a15 15 0 0 0-2.236-.173c-4.125 0-6.068 1.867-6.068 4.336s1.943 3.99 4.804 3.99c3.139 0 5.013-2.115 5.781-4.735.798.361 1.348 1.204 1.348 2.47 0 3.387-3.907 5.232-7.22 5.232-4.885 0-8.077-3.207-8.077-8.424 0-6.392 4.223-10.487 9.9-10.487 3.808 0 5.69 1.671 6.97 3.914l2.108-1.475C21.44 2.078 18.331 0 13.663 0 6.227 0 1.168 5.277 1.168 12.934c0 7 4.953 11.066 10.856 11.066 4.878 0 9.809-2.846 9.809-7.716 0-2.545-1.46-4.231-3.569-5.187m-6.33 4.855c-1.077 0-2.026-.512-2.026-1.453 0-1.483 1.822-1.934 3.606-1.934.678 0 1.34.045 1.927.173-.422 1.927-1.671 3.215-3.508 3.214Z" />
                </svg>
                <span>Threads</span>
              </a>
              <a
                href="https://medium.com/@nguyenhuy05042006/qu%C3%A1n-c%C3%A0-ph%C3%AA-%C4%91%C3%A0-l%E1%BA%A1t-e46987859f9e"
                target="_blank"
                rel="noopener noreferrer"
                title="Medium"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
                </svg>
                <span>Medium</span>
              </a>
              <a
                href="https://www.tumblr.com/quoctien14/831870553003540480/sunset-chill-caf%C3%A9-%C4%91%C3%A0-l%E1%BA%A1t-n%C6%A1i-%C4%91%E1%BB%83-b%E1%BA%A1n-ch%E1%BA%ADm-l%E1%BA%A1i?source=share"
                target="_blank"
                rel="noopener noreferrer"
                title="Tumblr"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.563 24c-5.093 0-7.031-3.756-7.031-6.411V9.747H5.116V6.648c3.63-1.313 4.512-4.596 4.71-6.469C9.84.051 9.941 0 9.999 0h3.517v6.114h4.801v3.633h-4.82v7.47c.016 1.001.375 2.371 2.207 2.371h.09c.631-.02 1.486-.205 1.936-.419l1.156 3.425c-.436.636-2.4 1.374-4.156 1.404h-.178l.011.002z" />
                </svg>
                <span>Tumblr</span>
              </a>
              <a
                href="https://lnkd.in/p/gsmMDcGU"
                target="_blank"
                rel="noopener noreferrer"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://linktr.ee/nguyenhuy2k6"
                target="_blank"
                rel="noopener noreferrer"
                title="Linktree"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m13.736 5.853 4.005-4.117 2.325 2.38-4.201 4.005h5.909v3.305h-5.937l4.229 4.108-2.325 2.334-5.741-5.769-5.741 5.769-2.325-2.334 4.229-4.108H2.227V8.121h5.909L4.131 4.116l2.325-2.38 4.005 4.117V0h3.275zm-3.275 10.306h3.275V24h-3.275z" />
                </svg>
                <span>Linktree</span>
              </a>
              <a
                href="https://qr.ae/pFzAcF"
                target="_blank"
                rel="noopener noreferrer"
                title="Quora"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7.38.948A11.963 11.963 0 0 1 21.248 19.54l2.41 2.422c.732.736.21 1.99-.828 1.99l-10.71.01a12.52 12.52 0 0 1-.304 0h-.02A11.963 11.963 0 0 1 7.382.95Zm7.322 4.428a7.172 7.172 0 1 0-5.487 13.251 7.172 7.172 0 0 0 5.488-13.251Z" />
                </svg>
                <span>Quora</span>
              </a>
              <a
                href="https://x.com/HuyNguyenkd4y/status/2116026858051682460?a=fVykg8zJKZRiFVK0fts&s=20"
                target="_blank"
                rel="noopener noreferrer"
                title="X (Twitter)"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
                </svg>
                <span>X</span>
              </a>
              <a
                href="https://ext-7028725.livejournal.com/412.html"
                target="_blank"
                rel="noopener noreferrer"
                title="LiveJournal"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.09 14.696c-1.512.664-2.726 1.885-3.381 3.399l4.27.883-.886-4.282h-.003zM2.475 8.317L0 5.85C1.125 3.237 3.216 1.14 5.823 0h.006l2.469 2.463c1.368-.591 2.876-.921 4.463-.921C18.967 1.542 24 6.569 24 12.771 24 18.973 18.967 24 12.761 24 6.551 24 1.52 18.976 1.52 12.771c0-1.591.355-3.081.952-4.451l9.143 9.114c1.125-2.613 3.218-4.71 5.823-5.85l-9.135-9.12h-.008c-2.606 1.14-4.695 3.24-5.823 5.85l.003.003z" />
                </svg>
                <span>LiveJournal</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <small>© 2026 Sunset Chill Café. All rights reserved.</small>
        </div>
      </div>
    </footer>
  );
}
