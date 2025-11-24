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

// App Store 风格的渐变色配置
const cardStyles = [
  {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    pattern: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
  },
  {
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.2) 0%, transparent 40%)',
  },
  {
    background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    pattern: 'radial-gradient(circle at 30% 80%, rgba(255, 255, 255, 0.18) 0%, transparent 45%)',
  },
  {
    background: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    pattern: 'radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.16) 0%, transparent 50%)',
  },
  {
    background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    pattern: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.2) 0%, transparent 40%)',
  },
  {
    background: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
    pattern: 'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.15) 0%, transparent 50%)',
  },
  {
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    pattern: 'radial-gradient(circle at 60% 70%, rgba(255, 255, 255, 0.25) 0%, transparent 45%)',
  },
  {
    background: 'linear-gradient(135deg, #ff9a56 0%, #ff6a88 100%)',
    pattern: 'radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.18) 0%, transparent 50%)',
  },
  {
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    pattern: 'radial-gradient(circle at 75% 50%, rgba(255, 255, 255, 0.2) 0%, transparent 40%)',
  },
]

export default function PostCard({ post, index }: { post: Post; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)

  // 根据索引选择样式
  const styleIndex = index % cardStyles.length
  const cardStyle = cardStyles[styleIndex]

  return (
    <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }}>
      <article
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: isPressed
            ? '0 4px 12px rgba(0, 0, 0, 0.15)'
            : isHovered 
              ? '0 24px 48px rgba(0, 0, 0, 0.2)'
              : '0 8px 16px rgba(0, 0, 0, 0.1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isPressed 
            ? 'scale(0.96)' 
            : isHovered 
              ? 'translateY(-12px) scale(1.03)' 
              : 'translateY(0) scale(1)',
          animation: `slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s backwards`,
          cursor: 'pointer',
          position: 'relative',
          minHeight: '280px',
          display: 'flex',
          flexDirection: 'column',
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

        {/* 渐变背景层 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: cardStyle.background,
          opacity: 1,
        }} />

        {/* 图案层 */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: cardStyle.pattern,
          opacity: 1,
        }} />

        {/* 装饰性几何图案 */}
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          width: '80px',
          height: '80px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.15)',
          transform: isHovered ? 'rotate(15deg) scale(1.1)' : 'rotate(0deg) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          backdropFilter: 'blur(10px)',
        }} />

        <div style={{
          position: 'absolute',
          bottom: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.12)',
          transform: isHovered ? 'scale(1.2)' : 'scale(1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }} />

        {/* 内容层 */}
        <div style={{ 
          padding: '28px',
          position: 'relative',
          zIndex: 1,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{
            display: 'inline-block',
            padding: '8px 16px',
            borderRadius: '12px',
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '16px',
            letterSpacing: '0.5px',
            width: 'fit-content',
            textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}>
            {post.category}
          </div>

          <h2 style={{
            fontSize: '22px',
            fontWeight: 700,
            marginBottom: '12px',
            color: '#ffffff',
            lineHeight: 1.3,
            letterSpacing: '-0.5px',
            textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
          }}>
            {post.title}
          </h2>

          {post.description && (
            <p style={{
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '16px',
              lineHeight: 1.6,
              fontSize: '15px',
              textShadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
              flex: 1,
            }}>
              {post.description}
            </p>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.85)',
            marginBottom: '16px',
            fontWeight: 500,
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
                    padding: '6px 12px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(5px)',
                    color: '#ffffff',
                    fontWeight: 600,
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
