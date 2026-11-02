const isExport = process.env.NEXT_EXPORT === 'true' || process.env.GITHUB_ACTIONS === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH !== undefined 
  ? process.env.NEXT_PUBLIC_BASE_PATH 
  : (process.env.GITHUB_ACTIONS === 'true' ? '/sunsetchillcoffee' : '');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: isExport ? 'export' : undefined,
  basePath: basePath,
  trailingSlash: false,
  images: {
    unoptimized: isExport,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  ...(isExport
    ? {}
    : {
        async rewrites() {
          return [
            { source: '/gioi-thieu.html', destination: '/gioi-thieu' },
            { source: '/mon-noi-bat.html', destination: '/mon-noi-bat' },
            { source: '/menu.html', destination: '/menu' },
            { source: '/khong-gian.html', destination: '/khong-gian' },
            { source: '/dat-ban.html', destination: '/dat-ban' },
            { source: '/dia-chi.html', destination: '/dia-chi' },
            { source: '/cam-nang.html', destination: '/blog' },
            { source: '/blog/index.html', destination: '/blog' },
            { source: '/blog/:slug.html', destination: '/blog/:slug' },
          ];
        },
      }),
};

export default nextConfig;
