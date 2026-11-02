import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Đặt Bàn Trực Tuyến Sunset Chill Café | Quán Cà Phê Chill Đà Lạt View Đẹp',
  description: 'Đặt bàn trước tại Sunset Chill Café 123 Hoàng Diệu, Đà Lạt để giữ chỗ view hoàng hôn đẹp nhất, bàn làm việc yên tĩnh hoặc bàn nhóm bạn. Xác nhận nhanh, không thu phí.',
  alternates: {
    canonical: '/dat-ban',
  },
  openGraph: {
    title: 'Đặt Bàn Trực Tuyến Sunset Chill Café Đà Lạt',
    description: 'Giữ chỗ trước tại Sunset Chill Café: Bàn cửa sổ view hoàng hôn, góc làm việc yên tĩnh, không gian sân vườn thoáng mát.',
    url: 'https://sunsetchillcoffee.vercel.app/dat-ban',
    type: 'website',
    locale: 'vi_VN',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200',
        width: 1200,
        height: 675,
        alt: 'Đặt bàn tại Sunset Chill Café Đà Lạt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Đặt Bàn Sunset Chill Café Đà Lạt',
    description: 'Giữ chỗ trước tại 123 Hoàng Diệu: Bàn cửa sổ ngắm hoàng hôn Đà Lạt.',
    images: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200'],
  },
};

export default function DatBanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
