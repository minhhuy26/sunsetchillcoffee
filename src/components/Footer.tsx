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
                        <div className="footer-social" role="group" aria-label="Mạng xã hội Sunset Chill">
              <a
                href="https://www.facebook.com/profile.php?id=61595926154194"
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
                href="https://linktr.ee/SunsetChillCoffee"
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
                href="https://sunsetchillcafe.livejournal.com/401.html"
                target="_blank"
                rel="noopener noreferrer"
                title="LiveJournal"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.09 14.696c-1.512.664-2.726 1.885-3.381 3.399l4.27.883-.886-4.282h-.003zM2.475 8.317L0 5.85C1.125 3.237 3.216 1.14 5.823 0h.006l2.469 2.463c1.368-.591 2.876-.921 4.463-.921C18.967 1.542 24 6.569 24 12.771 24 18.973 18.967 24 12.761 24 6.551 24 1.52 18.976 1.52 12.771c0-1.591.355-3.081.952-4.451l9.143 9.114c1.125-2.613 3.218-4.71 5.823-5.85l-9.135-9.12h-.008c-2.606 1.14-4.695 3.24-5.823 5.85l.003.003z" />
                </svg>
                <span>LiveJournal</span>
              </a>
              <a
                href="https://x.com/SunsetChillzz/status/2117985913443934616?a=AP5yvbaHOtxrs9phC7M&s=20"
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
                href="https://www.threads.com/share/MGmr6WSQH"
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
                href="https://mastodon.social/@HuyNguyen123/117547034524861856"
                target="_blank"
                rel="noopener noreferrer"
                title="Mastodon"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.193 7.88c0-5.207-3.411-6.733-3.411-6.733C18.062.357 15.108.025 12.041 0h-.076c-3.069.025-6.02.357-7.74 1.147 0 0-3.412 1.526-3.412 6.732 0 1.193-.023 2.619.015 4.13.124 5.092.934 10.11 5.641 11.355 2.17.574 4.034.695 5.536.612 2.722-.15 4.25-.972 4.25-.972l-.09-1.975s-1.945.613-4.13.54c-2.165-.075-4.449-.234-4.799-2.892a5.5 5.5 0 0 1-.048-.745s2.125.52 4.818.643c1.646.075 3.19-.097 4.758-.283 3.007-.359 5.625-2.212 5.954-3.905.517-2.665.475-6.508.475-6.508zm-4.024 6.709h-2.497v-6.12c0-1.29-.543-1.944-1.628-1.944-1.2 0-1.802.776-1.802 2.313v3.349h-2.484v-3.35c0-1.537-.602-2.313-1.802-2.313-1.085 0-1.628.655-1.628 1.945v6.119H4.831V8.285c0-1.29.328-2.314.987-3.07.68-.759 1.57-1.147 2.674-1.147 1.278 0 2.246.491 2.886 1.474L12 6.585l.622-1.043c.64-.983 1.608-1.474 2.886-1.474 1.104 0 1.994.388 2.674 1.146.658.757.986 1.781.986 3.07v6.305z" />
                </svg>
                <span>Mastodon</span>
              </a>
              <a
                href="https://pin.it/7JDfZyyLK"
                target="_blank"
                rel="noopener noreferrer"
                title="Pinterest"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
                <span>Pinterest</span>
              </a>
              <a
                href="https://qr.ae/pF6kwN"
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
                href="https://www.behance.net/nguynminhhuy5"
                target="_blank"
                rel="noopener noreferrer"
                title="Behance"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6.798 12.339c.644 0 1.666-.053 2.36-.611.583-.466.883-1.189.883-2.072 0-.829-.333-1.579-.933-2.003-.583-.414-1.394-.522-2.453-.522H0v10.963h6.914c1.178 0 2.158-.293 2.844-.882.721-.618 1.109-1.536 1.109-2.616 0-1.031-.383-1.802-.976-2.257zm-3.693-3.218h3.332c.861 0 1.488.381 1.488 1.196 0 .816-.627 1.25-1.488 1.25H3.105V9.121zm3.626 6.096H3.105v-2.793h3.626c.928 0 1.666.438 1.666 1.396 0 .93-.738 1.397-1.666 1.397zM20.203 7.822c-3.155 0-5.26 2.308-5.26 5.594 0 3.328 2.062 5.64 5.312 5.64 2.458 0 4.092-1.205 4.792-3.145h-2.65c-.417.724-1.17 1.096-2.142 1.096-1.536 0-2.441-1.045-2.529-2.65h7.458c.026-.264.04-.528.04-.792 0-3.329-1.956-5.743-5.021-5.743zm-2.427 4.606c.158-1.353 1.034-2.28 2.348-2.28 1.26 0 2.115.927 2.247 2.28h-4.595zM16.488 4.61h6.634v1.89h-6.634z" />
                </svg>
                <span>Behance</span>
              </a>
              <a
                href="https://sunsetchillcoffee.blogspot.com/2026/11/bat-tron-khoanh-khac-hoang-hon-tai.html"
                target="_blank"
                rel="noopener noreferrer"
                title="Blogspot"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M21.976 24H2.026C.9 24 0 23.1 0 21.976V2.026C0 .9.9 0 2.025 0H22.05C23.1 0 24 .9 24 2.025v19.95C24 23.1 23.1 24 21.976 24M12 3.975H9A5.025 5.025 0 0 0 3.975 9v6A5.025 5.025 0 0 0 9 20.024h6A5.025 5.025 0 0 0 20.024 15v-3.975c0-.6-.45-1.05-1.05-1.05H18a.995.995 0 0 1-.976-.976A5.025 5.025 0 0 0 12 3.973zm3.074 12H9c-.525 0-.975-.45-.975-.975s.45-.976.975-.976h6.074c.526 0 .977.45.977.976s-.45.976-.975.976zm-2.55-7.95c.527 0 .976.45.976.975s-.45.975-.975.975h-3.6c-.525 0-.976-.45-.976-.975s.45-.975.975-.975z" />
                </svg>
                <span>Blogspot</span>
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
