import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';
import MobileQuickActions from '@/components/MobileQuickActions';
import BackToTop from '@/components/BackToTop';
import { CartBookingProvider } from '@/context/CartBookingContext';

const CartDrawer = dynamic(() => import('@/components/CartDrawer'));
const PreorderModal = dynamic(() => import('@/components/PreorderModal'));

const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-SBS9KBZ3FB';

const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelDomain ? `https://${vercelDomain}` : 'https://sunsetchillcoffee.vercel.app')
).replace(/\/+$/, '');

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sunset Chill Café Đà Lạt | Quán Cà Phê Chill Đà Lạt View Đẹp, Cà Phê Rang Mộc Cầu Đất',
    template: '%s | Sunset Chill Café Đà Lạt',
  },
  description:
    'Sunset Chill Café - Quán cà phê chill Đà Lạt tại 123 Hoàng Diệu. Thưởng thức cà phê rang mộc nguyên chất, cafe sáng, cafe kem muối béo ngậy, bạc sỉu, cold brew cam, cacao nóng và bánh tiramisu ly trong không gian cafe sân vườn mộc mạc ngắm hoàng hôn yên tĩnh.',
  keywords: [
    'cà phê rang mộc là gì',
    'arabica cầu đất',
    'cách pha cold brew cam',
    'bạc sỉu là gì',
    'quán cà phê chill đà lạt',
    'quán cà phê gần đây',
    'quán cà phê yên tĩnh',
    'cafe muối',
    'cafe chồn',
    'cafe pha máy',
    'cafe đà lạt',
    'cafe hoàng diệu',
    'cafe muối đà lạt',
    'cafe nguyên chất',
    'cafe view đẹp',
    'cafe kem muối',
    'cafe đen đá',
    'cacao nóng',
    'tiramisu ly',
    'trà dâu tằm',
    'matcha latte đà lạt',
    'sunset chill',
    'cafe sân vườn',
    'cafe chụp hình đẹp',
    'cafe thư giản',
    'cafe mộc mạc',
    'cafe cầu đất',
    'cafe ngắm hoàng hôn',
    'cafe đọc sách',
    'cafe sáng',
    'cafe sáng đà lạt',
  ],
  authors: [{ name: 'Sunset Chill Café' }],
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'googlebd48b11684e0e217',
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      vi: siteUrl,
    },
  },
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'vi_VN',
    url: siteUrl,
    siteName: 'Sunset Chill Café',
    title: 'Sunset Chill Café Đà Lạt — Nơi để bạn chậm lại',
    description:
      'Quán cà phê ấm cúng trên Hoàng Diệu: rang mộc mỗi sáng, menu bạc sỉu – kem muối – cold brew, bàn cửa sổ view sương.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200',
        width: 1200,
        height: 675,
        alt: 'Không gian quán cà phê Sunset Chill tại Đà Lạt',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sunset Chill Café Đà Lạt',
    description: 'Cà phê rang mộc, không gian gỗ ấm, mở cửa 7h–22h tại Hoàng Diệu, Đà Lạt.',
    images: ['https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CafeOrCoffeeShop',
  name: 'Sunset Chill Café',
  alternateName: 'Sunset Chill',
  description: 'Quán cà phê rang mộc tại Đà Lạt, không gian ấm, menu cà phê – trà – bánh.',
  url: siteUrl,
  telephone: '+84-394-728-499',
  email: 'hello@sunsetchill.cafe',
  image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200',
  priceRange: '15.000đ - 45.000đ',
  servesCuisine: ['Cà phê', 'Trà', 'Bánh'],
  sameAs: [
    'https://www.facebook.com/profile.php?id=61595926154194',
    'https://linktr.ee/SunsetChillCoffee',
    'https://sunsetchillcafe.livejournal.com/401.html',
    'https://x.com/SunsetChillzz/status/2117985913443934616?a=AP5yvbaHOtxrs9phC7M&s=20',
    'https://www.threads.com/share/MGmr6WSQH',
    'https://mastodon.social/@HuyNguyen123/117547034524861856',
    'https://pin.it/7JDfZyyLK',
    'https://qr.ae/pF6kwN',
    'https://www.behance.net/nguynminhhuy5',
    'https://sunsetchillcoffee.blogspot.com/2026/11/bat-tron-khoanh-khac-hoang-hon-tai_01299051472.html',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Đường Hoàng Diệu, Phường 5',
    addressLocality: 'Đà Lạt',
    addressRegion: 'Lâm Đồng',
    addressCountry: 'VN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 11.9404,
    longitude: 108.4583,
  },
  hasMap: 'https://www.openstreetmap.org/?mlat=11.9404&mlon=108.4583#map=16/11.9404/108.4583',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '22:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday', 'Sunday'],
      opens: '07:00',
      closes: '23:00',
    },
  ],
  menu: `${siteUrl}/menu`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="theme-color" content="#2c1a0e" />
        <meta name="geo.region" content="VN-DL" />
        <meta name="geo.placename" content="Đà Lạt" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        {/* Preload Hero LCP image (Media-query targeted for mobile speed) */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-bg-mobile.webp"
          media="(max-width: 768px)"
          fetchPriority="high"
        />
        <link
          rel="preload"
          as="image"
          href="/images/hero-bg.webp"
          media="(min-width: 769px)"
          fetchPriority="high"
        />
        {/* Non-render-blocking optimized Google Fonts loaded during browser idle */}
        <script
          dangerouslySetInnerHTML={{
            __html: "(function(){function loadFonts(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+3:wght@400;600&display=optional';document.head.appendChild(l);}if('requestIdleCallback' in window){requestIdleCallback(loadFonts,{timeout:3000});}else{window.addEventListener('load',loadFonts,{once:true});}})();",
          }}
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Source+Sans+3:wght@400;600&display=optional"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google tag (gtag.js) - loaded on idle to eliminate TBT and CPU blocking */}
        <script
          id="google-tag-init"
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');
function loadGtag(){
  if (window._gtagLoaded) return;
  window._gtagLoaded = true;
  var s = document.createElement('script');
  s.src = 'https://www.googletagmanager.com/gtag/js?id=${gaId}';
  s.async = true;
  document.head.appendChild(s);
}
var events = ['scroll', 'touchstart', 'mousemove', 'click', 'keydown'];
events.forEach(function(e) { window.addEventListener(e, loadGtag, { passive: true, once: true }); });
setTimeout(loadGtag, 7000);`,
          }}
        />
      </head>
      <body>
        <CartBookingProvider>
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <PreorderModal />
          <Toast />
          <MobileQuickActions />
          <BackToTop />
        </CartBookingProvider>
      </body>
    </html>
  );
}
