import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { blogPosts, getBlogPostBySlug } from '@/data/blogPosts';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};

  const baseUrl = (
    process.env.NEXT_PUBLIC_SITE_URL || 'https://minhhuy26.github.io/sunsetchillcoffee'
  ).replace(/\/+$/, '');
  const url = `${baseUrl}/blog/${slug}`;

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: 'article',
      locale: 'vi_VN',
      url,
      title: post.title,
      description: post.description,
      images: [
        {
          url: post.image || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200',
          width: 1200,
          height: 675,
          alt: post.heading,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image || 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1200'],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = blogPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <main id="noi-dung">
      {/* We inject the exact article content extracted from original HTML */}
      <div
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

      {/* Related posts section */}
      <section
        className="section-card section-muted"
        style={{ maxWidth: '860px', margin: '40px auto', padding: '36px 32px' }}
      >
        <p className="eyebrow" style={{ textAlign: 'center' }}>
          Xem Thêm Cẩm Nang
        </p>
        <h2
          className="section-title"
          style={{ textAlign: 'center', marginBottom: '24px', fontSize: '26px' }}
        >
          Bài Viết Liên Quan
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {relatedPosts.map((r) => (
            <article
              key={r.slug}
              style={{
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #ebd9c8',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <img
                src={r.image}
                alt={r.heading}
                style={{ width: '100%', height: '140px', objectFit: 'cover' }}
                loading="lazy"
              />
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <span
                  style={{
                    fontSize: '12px',
                    color: 'var(--mau-cam)',
                    fontWeight: 700,
                    marginBottom: '6px',
                  }}
                >
                  {r.badge}
                </span>
                <h3 style={{ fontSize: '15px', lineHeight: 1.4, marginBottom: '8px' }}>
                  <Link href={`/blog/${r.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {r.heading}
                  </Link>
                </h3>
                <p style={{ fontSize: '13px', color: '#6e5848', lineHeight: 1.5, marginTop: 'auto' }}>
                  {r.description.slice(0, 90)}...
                </p>
                <Link
                  href={`/blog/${r.slug}`}
                  style={{
                    display: 'inline-block',
                    marginTop: '12px',
                    fontSize: '13px',
                    color: 'var(--mau-vang)',
                    fontWeight: 700,
                    textDecoration: 'none',
                  }}
                >
                  Đọc tiếp →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
