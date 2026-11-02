import type { Metadata } from 'next';

const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (vercelDomain ? `https://${vercelDomain}` : 'https://sunsetchillcoffee.vercel.app')
).replace(/\/+$/, '');

export const SITE_NAME = 'Sunset Chill Café';
export const SITE_TAGLINE = 'Quán cà phê chill Đà Lạt';
export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200';
export const PHONE_DISPLAY = '0394 728 499';
export const PHONE_E164 = '+84394728499';
export const EMAIL = 'hello@sunsetchill.cafe';
export const STREET_ADDRESS = '123 Đường Hoàng Diệu, Phường 5';
export const LOCALITY = 'Đà Lạt';
export const REGION = 'Lâm Đồng';

export const HOME_TITLE = 'Quán cà phê chill Đà Lạt | Sunset Chill Café';
export const HOME_DESCRIPTION =
  'Sunset Chill Café tại 123 Hoàng Diệu, Đà Lạt: cà phê rang mộc Arabica Cầu Đất, bạc sỉu, cafe kem muối, cold brew cam. Mở cửa 7h–22h, đặt bàn miễn phí.';

export function absoluteUrl(path = '/'): string {
  if (!path || path === '/') return SITE_URL;
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

export function pageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = 'Không gian Sunset Chill Café Đà Lạt',
  type = 'website',
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: 'website' | 'article';
}): Metadata {
  const url = absoluteUrl(path);

  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        vi: url,
        'x-default': url,
      },
    },
    openGraph: {
      type,
      locale: 'vi_VN',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: image, width: 1200, height: 675, alt: imageAlt }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function parseViDate(value: string): string | undefined {
  const match = value.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  if (!match) return undefined;
  return `${match[3]}-${match[2]}-${match[1]}`;
}
