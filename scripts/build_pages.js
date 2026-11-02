const fs = require('fs');
const path = require('path');

const pageConfigs = [
  {
    src: 'index.html',
    dest: 'src/app/page.tsx',
    isHome: true
  },
  {
    src: 'gioi-thieu.html',
    dest: 'src/app/gioi-thieu/page.tsx',
    subpath: 'gioi-thieu'
  },
  {
    src: 'mon-noi-bat.html',
    dest: 'src/app/mon-noi-bat/page.tsx',
    subpath: 'mon-noi-bat'
  },
  {
    src: 'menu.html',
    dest: 'src/app/menu/page.tsx',
    subpath: 'menu'
  },
  {
    src: 'khong-gian.html',
    dest: 'src/app/khong-gian/page.tsx',
    subpath: 'khong-gian'
  },
  {
    src: 'dia-chi.html',
    dest: 'src/app/dia-chi/page.tsx',
    subpath: 'dia-chi'
  },
  {
    src: 'blog/index.html',
    dest: 'src/app/blog/page.tsx',
    subpath: 'blog'
  }
];

function cleanHtml(html) {
  return html
    // Relative page links
    .replace(/href=["'](?:\.\.\/)?index\.html["']/g, 'href="/"')
    .replace(/href=["'](?:\.\.\/)?gioi-thieu\.html["']/g, 'href="/gioi-thieu"')
    .replace(/href=["'](?:\.\.\/)?mon-noi-bat\.html["']/g, 'href="/mon-noi-bat"')
    .replace(/href=["'](?:\.\.\/)?menu\.html["']/g, 'href="/menu"')
    .replace(/href=["'](?:\.\.\/)?khong-gian\.html["']/g, 'href="/khong-gian"')
    .replace(/href=["'](?:\.\.\/)?dat-ban\.html["']/g, 'href="/dat-ban"')
    .replace(/href=["'](?:\.\.\/)?dia-chi\.html["']/g, 'href="/dia-chi"')
    .replace(/href=["'](?:\.\.\/)?cam-nang\.html["']/g, 'href="/blog"')
    .replace(/href=["'](?:\.\.\/)?blog\/index\.html["']/g, 'href="/blog"')
    .replace(/href=["'](?:\.\.\/)?blog\/["']/g, 'href="/blog"')
    .replace(/href=["'](?:\.\.\/)?blog\/([^"'#]+)\.html(["'#])/g, 'href="/blog/$1$2')
    .replace(/href=["']([a-z0-9\-]+)\.html(["'#])/g, (m, p1, p2) => {
      if (['gioi-thieu', 'mon-noi-bat', 'menu', 'khong-gian', 'dat-ban', 'dia-chi', 'cam-nang'].includes(p1)) {
        return `href="/${p1}${p2}`;
      }
      return `href="/blog/${p1}${p2}`;
    })
    // Section anchors
    .replace(/href=["']index\.html#(.*?)["']/g, 'href="/#$1"');
}

pageConfigs.forEach(cfg => {
  const content = fs.readFileSync(cfg.src, 'utf8');
  const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';
  const descMatch = content.match(/<meta[^>]*name=["']description["'][^>]*content=["']([\s\S]*?)["']/i);
  const description = descMatch ? descMatch[1].trim() : '';

  const mainMatch = content.match(/<main[\s\S]*?<\/main>/i);
  if (!mainMatch) {
    console.error('No main in', cfg.src);
    return;
  }

  const cleanedMain = cleanHtml(mainMatch[0]);

  const componentName = cfg.isHome ? 'HomePage' : cfg.subpath.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('') + 'Page';

  const fileContent = `import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(description)},
  alternates: {
    canonical: ${JSON.stringify(cfg.isHome ? '/' : '/' + cfg.subpath)},
  },
};

export default function ${componentName}() {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: ${JSON.stringify(cleanedMain)},
      }}
    />
  );
}
`;

  fs.mkdirSync(path.dirname(cfg.dest), { recursive: true });
  fs.writeFileSync(cfg.dest, fileContent, 'utf8');
  console.log(`Wrote ${cfg.dest} (len: ${fileContent.length})`);
});
