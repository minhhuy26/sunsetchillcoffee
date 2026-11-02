import { MetadataRoute } from 'next';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://minhhuy26.github.io/sunsetchillcoffee'
  ).replace(/\/+$/, '');
  
  const currentDate = new Date();

  const blogSlugs = [
    'ca-phe-rang-moc-da-lat-nguyen-chat',
    'arabica-cau-dat-linh-hon-ca-phe-da-lat',
    'bi-quyet-pha-cold-brew-cam-bergamot',
    'ca-phe-kem-muoi-da-lat-ngon-kho-cuong',
    'bac-siu-da-lat-thuc-uong-khoi-dau-ngay-moi',
    'top-quan-cafe-yen-tinh-lam-viec-da-lat',
    'quan-cafe-ngam-hoang-hon-suong-chieu-da-lat',
    'quan-cafe-mo-som-da-lat-don-binh-minh',
    'quan-cafe-am-cung-tu-tap-ban-be-da-lat',
    'kham-pha-quan-cafe-duong-hoang-dieu-da-lat',
  ];

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/mon-noi-bat`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/khong-gian`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dat-ban`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dia-chi`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: currentDate,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticPages, ...blogPages];
}
