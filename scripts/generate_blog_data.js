const fs = require('fs');
const path = require('path');

const blogDir = 'blog';
const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.html') && f !== 'index.html');

const posts = [];

files.forEach(f => {
  const slug = f.replace('.html', '');
  const html = fs.readFileSync(path.join(blogDir, f), 'utf8');

  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const descMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
  const description = descMatch ? descMatch[1].trim() : '';

  const ogImgMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([\s\S]*?)["']/i);
  const image = ogImgMatch ? ogImgMatch[1].trim() : '';

  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let mainContent = mainMatch ? mainMatch[1].trim() : '';

  // Clean relative links in content
  mainContent = mainContent
    .replace(/href=["']\.\.\/index\.html["']/g, 'href="/"')
    .replace(/href=["']index\.html["']/g, 'href="/blog"')
    .replace(/href=["']\.\.\/gioi-thieu\.html["']/g, 'href="/gioi-thieu"')
    .replace(/href=["']\.\.\/mon-noi-bat\.html["']/g, 'href="/mon-noi-bat"')
    .replace(/href=["']\.\.\/menu\.html["']/g, 'href="/menu"')
    .replace(/href=["']\.\.\/khong-gian\.html["']/g, 'href="/khong-gian"')
    .replace(/href=["']\.\.\/dat-ban\.html["']/g, 'href="/dat-ban"')
    .replace(/href=["']\.\.\/dia-chi\.html["']/g, 'href="/dia-chi"')
    .replace(/href=["']([^"']+)\.html["']/g, 'href="/blog/$1"');

  const badgeMatch = html.match(/<span class=["']blog-badge["']>([\s\S]*?)<\/span>/i);
  const badge = badgeMatch ? badgeMatch[1].trim() : 'Cẩm nang';

  const authorMatch = html.match(/Tác giả:\s*<strong>([\s\S]*?)<\/strong>/i);
  const author = authorMatch ? authorMatch[1].trim() : 'Sunset Chill Barista Team';

  const dateMatch = html.match(/Ngày đăng:\s*<strong>([\s\S]*?)<\/strong>/i);
  const date = dateMatch ? dateMatch[1].trim() : '15/10/2026';

  const readTimeMatch = html.match(/Thời gian đọc:\s*<strong>([\s\S]*?)<\/strong>/i);
  const readTime = readTimeMatch ? readTimeMatch[1].trim() : '5 phút';

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const heading = h1Match ? h1Match[1].trim() : title;

  posts.push({
    slug,
    title,
    heading,
    description,
    image,
    badge,
    author,
    date,
    readTime,
    content: mainContent
  });
});

const tsContent = `export interface BlogPost {
  slug: string;
  title: string;
  heading: string;
  description: string;
  image: string;
  badge: string;
  author: string;
  date: string;
  readTime: string;
  content: string;
}

export const blogPosts: BlogPost[] = ${JSON.stringify(posts, null, 2)};

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(p => p.slug === slug);
}
`;

fs.mkdirSync('src/data', { recursive: true });
fs.writeFileSync('src/data/blogPosts.ts', tsContent, 'utf8');
console.log(`Successfully generated src/data/blogPosts.ts with ${posts.length} articles!`);
