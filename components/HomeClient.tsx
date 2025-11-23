'use client';

import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';
import { CSSProperties, useState, useEffect } from 'react';

interface HomeClientProps {
  posts: PostMetadata[];
  featuredPosts: PostMetadata[];
}

export default function HomeClient({ posts, featuredPosts }: HomeClientProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    // Handle responsive layout
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const containerStyle: CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '48px 16px',
  };

  const heroSectionStyle: CSSProperties = {
    marginBottom: '64px',
    textAlign: 'center',
  };

  const h1Style: CSSProperties = {
    fontSize: isMobile ? '32px' : '48px',
    fontWeight: 'bold',
    marginBottom: '16px',
  };

  const heroTextStyle: CSSProperties = {
    fontSize: '20px',
    color: '#666',
    marginBottom: '32px',
    maxWidth: '672px',
    margin: '0 auto 32px',
  };

  const searchContainerStyle: CSSProperties = {
    display: 'flex',
    justifyContent: 'center',
  };

  const featuredSectionStyle: CSSProperties = {
    marginBottom: '48px',
  };

  const sectionHeaderStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '24px',
  };

  const h2Style: CSSProperties = {
    fontSize: '30px',
    fontWeight: 'bold',
  };

  const viewAllLinkStyle: CSSProperties = {
    color: '#0070f3',
    textDecoration: 'none',
    transition: 'text-decoration 0.2s',
  };

  const postsGridStyle: CSSProperties = {
    display: 'grid',
    gap: '24px',
    gridTemplateColumns: isMobile ? '1fr' : isTablet ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
  };

  const statsSectionStyle: CSSProperties = {
    marginTop: '64px',
    paddingTop: '48px',
    borderTop: '1px solid #e5e7eb',
  };

  const statsGridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
    gap: '32px',
    textAlign: 'center',
  };

  const statNumberStyle: CSSProperties = {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#0070f3',
    marginBottom: '8px',
  };

  const statLabelStyle: CSSProperties = {
    color: '#666',
  };

  return (
    <div style={containerStyle}>
      {/* Hero Section */}
      <section style={heroSectionStyle}>
        <h1 style={h1Style}>
          欢迎来到我的博客
        </h1>
        <p style={heroTextStyle}>
          分享技术心得、开发经验和学习笔记
        </p>
        <div style={searchContainerStyle}>
          <SearchBar />
        </div>
      </section>

      {/* Featured Posts */}
      <section style={featuredSectionStyle}>
        <div style={sectionHeaderStyle}>
          <h2 style={h2Style}>最新文章</h2>
          <Link
            href="/posts"
            style={viewAllLinkStyle}
            onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
          >
            查看全部 →
          </Link>
        </div>
        <div style={postsGridStyle}>
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={statsSectionStyle}>
        <div style={statsGridStyle}>
          <div>
            <div style={statNumberStyle}>
              {posts.length}
            </div>
            <div style={statLabelStyle}>篇文章</div>
          </div>
          <div>
            <div style={statNumberStyle}>
              {new Set(posts.flatMap(p => p.tags)).size}
            </div>
            <div style={statLabelStyle}>个标签</div>
          </div>
          <div>
            <div style={statNumberStyle}>
              {new Set(posts.map(p => p.category)).size}
            </div>
            <div style={statLabelStyle}>个分类</div>
          </div>
        </div>
      </section>
    </div>
  );
}
