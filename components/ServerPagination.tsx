'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface ServerPaginationProps {
  currentPage: number
  totalPages: number
}

export default function ServerPagination({ currentPage, totalPages }: ServerPaginationProps) {
  const router = useRouter()
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [pressedButton, setPressedButton] = useState<string | null>(null)

  const handleClick = (page: number, type: string) => {
    setPressedButton(type)
    setTimeout(() => {
      setPressedButton(null)
      router.push(`/posts?page=${page}`)
    }, 150)
  }

  const buttonStyle = (isDisabled: boolean, buttonType: string) => ({
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: 'none',
    background: isDisabled
      ? 'rgba(0, 0, 0, 0.04)'
      : hoveredButton === buttonType
        ? 'rgba(0, 0, 0, 0.08)'
        : 'rgba(0, 0, 0, 0.05)',
    color: isDisabled ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.6)',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontSize: '20px',
    fontWeight: 300,
    transition: 'all 0.25s cubic-bezier(0.32, 0.72, 0, 1)',
    transform: pressedButton === buttonType ? 'scale(0.92)' : 'scale(1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    boxShadow: isDisabled ? 'none' : '0 2px 8px rgba(0, 0, 0, 0.06)',
  })

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
    }}>
      {/* 上一页 */}
      <button
        onClick={() => handleClick(currentPage - 1, 'prev')}
        disabled={currentPage === 1}
        onMouseEnter={() => setHoveredButton('prev')}
        onMouseLeave={() => setHoveredButton(null)}
        style={buttonStyle(currentPage === 1, 'prev')}
      >
        ‹
      </button>

      {/* 页码 */}
      <div style={{
        padding: '0 16px',
        height: '44px',
        borderRadius: '22px',
        background: 'rgba(0, 0, 0, 0.04)',
        color: 'rgba(0, 0, 0, 0.6)',
        fontSize: '13px',
        fontWeight: 500,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '80px',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", sans-serif',
      }}>
        {currentPage} / {totalPages}
      </div>

      {/* 下一页 */}
      <button
        onClick={() => handleClick(currentPage + 1, 'next')}
        disabled={currentPage === totalPages}
        onMouseEnter={() => setHoveredButton('next')}
        onMouseLeave={() => setHoveredButton(null)}
        style={buttonStyle(currentPage === totalPages, 'next')}
      >
        ›
      </button>
    </div>
  )
}
