'use client'

import Link from 'next/link'
import { useState } from 'react'

interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  category: string
  description?: string
  readingTime?: string
}

export default function PostCard({ post, index }: { post: Post; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  return (
    <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
      <article
        style={{
          borderRadius: '18px',
          backgroundColor: 'var(--card-bg)',
          overflow: 'hidden',
          boxShadow: isPressed
            ? '0 2px 8px rgba(0, 0, 0, 0.12)'
            : isHovered 
              ? '0 20px 40px rgba(0, 0, 0, 0.15)'
              : '0 4px 12px rgba(0, 0, 0, 0.08)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isPressed 
            ? 'scale(0.96)' 
            : isHovered 
              ? 'translateY(-8px) scale(1.02)' 
              : 'translateY(0) scale(1)',
          animation: `slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s backwards`,
          cursor: 'pointer',
          border: '1px solid var(--border-color)',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false)
          setIsPressed(false)
        }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
      >
        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>

        <div style={{ padding: '24px' }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 12px',
            borderRadius: '12px',
            backgroundColor: 'rgba(0, 122, 255, 0.1)',
            color: '#007AFF',
            fontSize: '12px',
            fontWeight: 600,
            marginBottom: '12px',
            letterSpacing: '0.3px',
          }}>
            {post.category}
          </div>

          <h2 style={{
            fontSize: '20px',
            fontWeight: 600,
            marginBottom: '8px',
            color: 'var(--text-primary)',
            lineHeight: 1.4,
            letterSpacing: '-0.3px',
          }}>
            {post.title}
          </h2>

          {post.description && (
            <p style={{
              color: 'var(--text-secondary)',
              marginBottom: '16px',
              lineHeight: 1.6,
              fontSize: '15px',
            }}>
              {post.description}
            </p>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            color: 'var(--text-tertiary)',
            marginBottom: '16px',
          }}>
            <time>{new Date(post.date).toLocaleDateString('zh-CN')}</time>
            {post.readingTime && (
              <>
                <span>·</span>
                <span>{post.readingTime}</span>
              </>
            )}
          </div>

          {post.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {post.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: '12px',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    backgroundColor: 'var(--tag-bg)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
