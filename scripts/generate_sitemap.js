const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://minhhuy26.github.io/sunsetchillcoffee';
const cleanBase = BASE_URL.replace(/\/+$/, '');

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
  'kham-pha-quan-cafe-duong-hoang-dieu-da-lat'
];

const today = new Date().toISOString().split('T')[0];

const routes = [
  { url: '', priority: '1.0', changefreq: 'daily' },
  { url: '/gioi-thieu', priority: '0.9', changefreq: 'weekly' },
  { url: '/mon-noi-bat', priority: '0.9', changefreq: 'weekly' },
  { url: '/menu', priority: '0.9', changefreq: 'weekly' },
  { url: '/khong-gian', priority: '0.9', changefreq: 'weekly' },
  { url: '/dat-ban', priority: '0.9', changefreq: 'weekly' },
  { url: '/dia-chi', priority: '0.9', changefreq: 'weekly' },
  { url: '/blog', priority: '0.9', changefreq: 'weekly' },
  ...blogSlugs.map(slug => ({
    url: `/blog/${slug}`,
    priority: '0.8',
    changefreq: 'monthly'
  }))
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(r => `  <url>
    <loc>${cleanBase}${r.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), xml.trim() + '\n', 'utf8');
console.log('Successfully generated public/sitemap.xml for base:', cleanBase);
