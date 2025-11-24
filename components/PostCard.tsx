'use client'

import Link from 'next/link'
import Image from 'next/image'
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

const getCategoryIcon = (category: string): string => {
  const iconMap: { [key: string]: string } = {
    '原油信号分析': '/images/icons/oil-signal.svg',
    '自建梯子': '/images/icons/vpn-tools.svg',
    '斐波那契均三条移动平均线': '/images/icons/technical-analysis.svg',
    '从零开始の外汇': '/images/icons/forex-trading.svg',
    'MT5交易软件安装指南': '/images/icons/trading-strategy.svg',
    '外汇交易': '/images/icons/forex-trading.svg',
    '技术分析': '/images/icons/technical-analysis.svg',
    '交易策略': '/images/icons/trading-strategy.svg',
  }
  return iconMap[category] || '/images/icons/default.svg'
}

export default function PostCard({ post, index }: { post: Post; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [isClicked, setIsClicked] = useState(false)
  const styleIndex = index % cardStyles.length
  const cardStyle = cardStyles[styleIndex]

  const handleClick = (e: React.MouseEvent) => {
    setIsClicked(true)
    setTimeout(() => {
      window.location.href = `/posts/${post.slug}`
    }, 250)
    e.preventDefault()
  }

  return (
    <Link href={`/posts/${post.slug}`} style={{ textDecoration: 'none' }} onClick={handleClick}>
      <article
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: isClicked 
            ? '0 40px 80px rgba(0, 0, 0, 0.3)'
            : isPressed 
              ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
              : isHovered 
                ? '0 24px 48px rgba(0, 0, 0, 0.2)' 
                : '0 8px 16px rgba(0, 0, 0, 0.1)',
          transition: isClicked 
            ? 'all 0.25s cubic-bezier(0.32, 0.72, 0, 1)'
            : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isClicked
            ? 'scale(1.08) translateY(-15px)'
            : isPressed 
              ? 'scale(0.96)' 
              : isHovered 
                ? 'translateY(-12px) scale(1.03)' 
                : 'translateY(0) scale(1)',
          animation: isClicked 
            ? 'cardExpandFast 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards'
            : `slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s backwards`,
          cursor: 'pointer',
          position: 'relative',
          minHeight: '280px',
          display: 'flex',
          flexDirection: 'column',
          opacity: isClicked ? 0 : 1,
          zIndex: isClicked ? 999 : 1,
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
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes cardExpandFast {
            0% {
              transform: scale(1);
              opacity: 1;
            }
            100% {
              transform: scale(1.1);
              opacity: 0;
            }
          }
        `}</style>
        
        {/* 渐变背景层 */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: cardStyle.background, opacity: 1 }} />
        
        {/* 图案层 */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: cardStyle.pattern, opacity: 1 }} />
        
        {/* 纯图标 - 移除装饰方框 */}
        <div style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isHovered ? 'rotate(8deg) scale(1.1)' : 'rotate(0deg) scale(1)',
          transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        }}>
          <Image 
            src={getCategoryIcon(post.category)} 
            alt={post.category} 
            width={80} 
            height={80} 
            style={{ 
              filter: 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.2))',
            }} 
            priority={index < 3} 
          />
        </div>

        {/* 内容层 */}
        <div style={{ padding: '28px', paddingRight: '120px', position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.25)', backdropFilter: 'blur(10px)', color: '#ffffff', fontSize: '13px', fontWeight: 700, marginBottom: '16px', letterSpacing: '0.5px', width: 'fit-content', textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
            {post.category}
          </div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '12px', color: '#ffffff', lineHeight: 1.3, letterSpacing: '-0.5px', textShadow: '0 2px 8px rgba(0, 0, 0, 0.15)' }}>{post.title}</h2>
          {post.description && <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '16px', lineHeight: 1.6, fontSize: '15px', textShadow: '0 1px 4px rgba(0, 0, 0, 0.1)', flex: 1 }}>{post.description}</p>}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '16px', fontWeight: 500 }}>
            <time>{new Date(post.date).toLocaleDateString('zh-CN')}</time>
            {post.readingTime && <><span>·</span><span>{post.readingTime}</span></>}
          </div>
          {post.tags.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {post.tags.slice(0, 3).map((tag) => <span key={tag} style={{ fontSize: '12px', padding: '6px 12px', borderRadius: '8px', backgroundColor: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'blur(5px)', color: '#ffffff', fontWeight: 600 }}>#{tag}</span>)}
            </div>
          )}
        </div>
      </article>
    </Link>
  )
}
