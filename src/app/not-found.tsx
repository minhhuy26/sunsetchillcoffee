import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Không tìm thấy trang',
  description: 'Trang bạn tìm không tồn tại. Quay lại Sunset Chill Café Đà Lạt để xem menu, đặt bàn hoặc cẩm nang cà phê.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main id="noi-dung" className="article-page" style={{ maxWidth: 720, textAlign: 'center', padding: '72px 24px' }}>
      <p className="eyebrow">404</p>
      <h1 style={{ fontSize: 36, marginBottom: 16 }}>Trang này không còn nữa</h1>
      <p style={{ color: 'var(--mau-chu-nhat)', marginBottom: 28, lineHeight: 1.6 }}>
        Có thể đường dẫn đã đổi sau khi website chuyển sang địa chỉ sạch. Chọn một trang bên dưới để tiếp tục.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link href="/" className="btn">
          Trang chủ
        </Link>
        <Link href="/menu" className="btn btn-outline">
          Menu
        </Link>
        <Link href="/dat-ban" className="btn btn-outline">
          Đặt bàn
        </Link>
        <Link href="/dia-chi" className="btn btn-outline">
          Địa chỉ
        </Link>
      </div>
    </main>
  );
}
