import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  const vercelDomain = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (vercelDomain ? `https://${vercelDomain}` : 'https://minhhuy26.github.io/sunsetchillcoffee')
  ).replace(/\/+$/, '');

  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/sitemap_index.xml`,
    ],
  };
}
