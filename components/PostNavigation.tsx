'use client'

import Link from 'next/link'
import { useState } from 'react'

interface PostNavigationProps {
  prev: {
    slug: string
    title: string
  } | null
  next: {
    slug: string
    title: string
  } | null
}

export default function PostNavigation({ prev, next }: PostNavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<'prev' | 'next' | null>(null)
  const [pressedItem, setPressedItem] = useState<'prev' | 'next' | null>(null)

  if (!prev && !next) return null

  return (
    <nav style={{
      display: 'grid',
      gridTemplateColumns: prev && next ? '1fr 1fr' : '1fr',
      gap: '20px',
      marginTop: '64px',
      paddingTop: '48px',
      borderTop: '1px solid var(--border-color)',
    }}>
      {/* 上一篇 */}
      {prev && (
        <Link
          href={`/posts/${prev.slug}`}
          style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '24px',
            borderRadius: '18px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: pressedItem === 'prev'
              ? 'scale(0.96)'
              : hoveredItem === 'prev'
                ? 'translateY(-8px) scale(1.02)'
                : 'scale(1)',
            boxShadow: pressedItem === 'prev'
              ? '0 2px 8px rgba(0, 0, 0, 0.12)'
              : hoveredItem === 'prev'
                ? '0 20px 40px rgba(0, 0, 0, 0.15)'
                : '0 4px 12px rgba(0, 0, 0, 0.08)',
          }}
          onMouseEnter={() => setHoveredItem('prev')}
          onMouseLeave={() => {
            setHoveredItem(null)
            setPressedItem(null)
          }}
          onMouseDown={() => setPressedItem('prev')}
          onMouseUp={() => setPressedItem(null)}
          onTouchStart={() => setPressedItem('prev')}
          onTouchEnd={() => setPressedItem(null)}
        >
          <span style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '8px',
            fontWeight: 500,
          }}>
            ← 上一篇
          </span>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1.4,
          }}>
            {prev.title}
          </h3>
        </Link>
      )}

      {/* 下一篇 */}
      {next && (
        <Link
          href={`/posts/${next.slug}`}
          style={{
            textDecoration: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
            padding: '24px',
            borderRadius: '18px',
            backgroundColor: 'var(--card-bg)',
            border: '1px solid var(--border-color)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: pressedItem === 'next'
              ? 'scale(0.96)'
              : hoveredItem === 'next'
                ? 'translateY(-8px) scale(1.02)'
                : 'scale(1)',
            boxShadow: pressedItem === 'next'
              ? '0 2px 8px rgba(0, 0, 0, 0.12)'
              : hoveredItem === 'next'
                ? '0 20px 40px rgba(0, 0, 0, 0.15)'
                : '0 4px 12px rgba(0, 0, 0, 0.08)',
            gridColumn: !prev ? '1' : 'auto',
          }}
          onMouseEnter={() => setHoveredItem('next')}
          onMouseLeave={() => {
            setHoveredItem(null)
            setPressedItem(null)
          }}
          onMouseDown={() => setPressedItem('next')}
          onMouseUp={() => setPressedItem(null)}
          onTouchStart={() => setPressedItem('next')}
          onTouchEnd={() => setPressedItem(null)}
        >
          <span style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            marginBottom: '8px',
            fontWeight: 500,
          }}>
            下一篇 →
          </span>
          <h3 style={{
            fontSize: '18px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            margin: 0,
            lineHeight: 1.4,
            textAlign: 'right',
          }}>
            {next.title}
          </h3>
        </Link>
      )}
    </nav>
  )
}
