'use client';

import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import { CSSProperties, useState } from 'react';

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const cardStyle: CSSProperties = {
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    backgroundColor: '#fff',
    padding: '24px',
    boxShadow: isHovered ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
    transition: 'box-shadow 0.3s ease',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  };

  const titleStyle: CSSProperties = {
    fontSize: '24px',
    fontWeight: '600',
    marginBottom: '8px',
    color: isHovered ? '#0070f3' : '#000',
    transition: 'color 0.2s ease',
    textDecoration: 'none',
  };

  const metaStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    fontSize: '14px',
    color: '#666',
    marginBottom: '12px',
  };

  const categoryStyle: CSSProperties = {
    color: '#0070f3',
  };

  const descriptionStyle: CSSProperties = {
    color: '#666',
    marginBottom: '16px',
    lineHeight: '1.6',
    flex: 1,
  };

  const tagsContainerStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  };

  return (
    <article 
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
        <h2 style={titleStyle}>
          {post.title}
        </h2>
      </Link>
      <div style={metaStyle}>
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>·</span>
        <span>{post.readingTime}</span>
        <span>·</span>
        <span style={categoryStyle}>{post.category}</span>
      </div>
      {post.description && (
        <p style={descriptionStyle}>{post.description}</p>
      )}
      {post.tags.length > 0 && (
        <div style={tagsContainerStyle}>
          {post.tags.map((tag) => (
            <TagLink key={tag} tag={tag} />
          ))}
        </div>
      )}
    </article>
  );
}

function TagLink({ tag }: { tag: string }) {
  const [isHovered, setIsHovered] = useState(false);

  const tagStyle: CSSProperties = {
    fontSize: '12px',
    padding: '4px 12px',
    borderRadius: '9999px',
    backgroundColor: isHovered ? 'rgba(229, 231, 235, 0.8)' : '#e5e7eb',
    transition: 'background-color 0.2s ease',
    textDecoration: 'none',
    color: '#374151',
  };

  return (
    <Link
      href={`/tags/${tag}`}
      style={tagStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      #{tag}
    </Link>
  );
}
