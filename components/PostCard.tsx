'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useMemo } from 'react'

interface Post {
  slug: string
  title: string
  date: string
  tags: string[]
  category: string
  description?: string
  readingTime?: string
}

const cardStyles = [
  {
    background: 'linear-gradient(135deg, #B8E3FF 0%, #7EC8E3 100%)',
    pattern: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
  },
  {
    background: 'linear-gradient(135deg, #B4E7CE 0%, #8FD5A4 100%)',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 40%)',
  },
  {
    background: 'linear-gradient(135deg, #A8C5E3 0%, #88A8D0 100%)',
    pattern: 'radial-gradient(circle at 30% 80%, rgba(255, 255, 255, 0.25) 0%, transparent 45%)',
  },
  {
    background: 'linear-gradient(135deg, #FFD9B3 0%, #FFBB7A 100%)',
    pattern: 'radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)',
  },
  {
    background: 'linear-gradient(135deg, #FFB5C2 0%, #FF8FA3 100%)',
    pattern: 'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 40%)',
  },
  {
    background: 'linear-gradient(135deg, #B5E6D5 0%, #8FD9BE 100%)',
    pattern: 'radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.25) 0%, transparent 50%)',
  },
]

const decorationIcons = [
  '/images/decorations/balloon.svg',
  '/images/decorations/book.svg',
  '/images/decorations/plane.svg',
  '/images/decorations/music.svg',
  '/images/decorations/camera.svg',
  '/images/decorations/rocket.svg',
]

export default function PostCard({ post, index }: { post: Post; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const styleIndex = index % cardStyles.length
  const cardStyle = cardStyles[styleIndex]
  
  const decorationIcon = useMemo(() => {
    return decorationIcons[index % decorationIcons.length]
  }, [index])

  const handleClick = (e: React.MouseEvent) => {
    setIsClicked(true)
    setTimeout(() => {
      window.location.href = `/posts/${post.slug}`
    }, 250)
    e.preventDefault()
  }

  return (
    <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }} onClick={handleClick} prefetch={false}>
      <article
        style={{
          borderRadius: '14px',
          overflow: 'hidden',
          boxShadow: isClicked 
            ? '0 20px 40px rgba(0, 0, 0, 0.2)'
            : isPressed 
              ? '0 2px 8px rgba(0, 0, 0, 0.1)' 
              : isHovered 
                ? '0 12px 24px rgba(0, 0, 0, 0.15)' 
                : '0 4px 12px rgba(0, 0, 0, 0.08)',
          transition: isClicked 
            ? 'all 0.25s cubic-bezier(0.32, 0.72, 0, 1)'
            : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isClicked
            ? 'scale(1.05) translateY(-8px)'
            : isPressed 
              ? 'scale(0.98)' 
              : isHovered 
                ? 'translateY(-4px) scale(1.02)' 
                : 'translateY(0) scale(1)',
          animation: isClicked 
            ? 'cardExpandFast 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards'
            : `slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s backwards`,
          cursor: 'pointer',
          position: 'relative',
          width: '100%',
          height: '0',
          paddingBottom: '70%',
          display: 'block',
          opacity: isClicked ? 0 : 1,
          zIndex: isClicked ? 999 : 1,
          willChange: 'transform, opacity',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => { setIsHovered(false); setIsPressed(false) }}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onTouchStart={() => setIsPressed(true)}
        onTouchEnd={() => setIsPressed(false)}
      >
        <style jsx>{`
          @keyframes slideUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes cardExpandFast {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(1.08);
              opacity: 0;
            }
          }
        `}</style>
        
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: cardStyle.background, opacity: 1 }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: cardStyle.pattern, opacity: 1 }} />
          
          {/* 右上角图案 - 放大尺寸 */}
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          }}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <Image 
                src={decorationIcon}
                alt="decoration" 
                fill
                sizes="80px"
                style={{ 
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 4px 10px rgba(0, 0, 0, 0.18))',
                }}
                loading={index < 6 ? 'eager' : 'lazy'}
                priority={index < 4}
              />
            </div>
          </div>

          <div style={{ 
            padding: '12px', 
            paddingRight: '95px',
            position: 'relative', 
            zIndex: 1, 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ 
                display: 'inline-block', 
                padding: '3px 8px', 
                borderRadius: '6px', 
                backgroundColor: 'rgba(255, 255, 255, 0.4)', 
                backdropFilter: 'blur(8px)', 
                color: 'rgba(0, 0, 0, 0.7)', 
                fontSize: '9px', 
                fontWeight: 700, 
                marginBottom: '6px', 
                letterSpacing: '0.2px', 
                width: 'fit-content',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
              }}>
                {post.category}
              </div>
              
              <h2 style={{ 
                fontSize: '13px', 
                fontWeight: 700, 
                marginBottom: '4px', 
                color: 'rgba(0, 0, 0, 0.85)', 
                lineHeight: 1.3, 
                letterSpacing: '-0.2px', 
                display: '-webkit-box', 
                WebkitLineClamp: 2, 
                WebkitBoxOrient: 'vertical', 
                overflow: 'hidden',
                wordBreak: 'break-word',
              }}>
                {post.title}
              </h2>
              
              {post.description && (
                <p style={{ 
                  color: 'rgba(0, 0, 0, 0.6)', 
                  lineHeight: 1.35, 
                  fontSize: '10px', 
                  display: '-webkit-box', 
                  WebkitLineClamp: 2, 
                  WebkitBoxOrient: 'vertical', 
                  overflow: 'hidden',
                  wordBreak: 'break-word',
                  marginBottom: '4px',
                }}>
                  {post.description}
                </p>
              )}
            </div>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px', 
              fontSize: '9px', 
              color: 'rgba(0, 0, 0, 0.5)', 
              fontWeight: 500,
            }}>
              <time>{new Date(post.date).toLocaleDateString('zh-CN', { month: 'numeric', day: 'numeric' })}</time>
              {post.readingTime && <><span>·</span><span>{post.readingTime}</span></>}
            </div>
          </div>
        </div>
      </article>
    </Link>
  )
}
