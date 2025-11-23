'use client'

import { useState } from 'react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [pressedButton, setPressedButton] = useState<string | null>(null)

  const handleClick = (page: number, type: string) => {
    setPressedButton(type)
    setTimeout(() => setPressedButton(null), 200)
    onPageChange(page)
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
      marginTop: '48px',
      padding: '20px',
    }}>
      {/* 上一页 */}
      <button
        onClick={() => handleClick(currentPage - 1, 'prev')}
        disabled={currentPage === 1}
        style={{
          padding: '10px 20px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          background: currentPage === 1 ? 'var(--button-disabled-bg)' : 'var(--card-bg)',
          color: currentPage === 1 ? 'var(--text-tertiary)' : 'var(--text-primary)',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          fontSize: '15px',
          fontWeight: 500,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: pressedButton === 'prev' ? 'scale(0.95)' : 'scale(1)',
          boxShadow: pressedButton === 'prev' 
            ? '0 2px 8px rgba(0, 0, 0, 0.12)'
            : '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
        onMouseEnter={(e) => {
          if (currentPage !== 1) {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.12)'
          }
        }}
        onMouseLeave={(e) => {
          if (pressedButton !== 'prev') {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
          }
        }}
      >
        ← 上一页
      </button>

      {/* 页码指示 */}
      <div style={{
        padding: '10px 20px',
        borderRadius: '12px',
        background: 'var(--card-bg)',
        color: 'var(--text-primary)',
        fontSize: '15px',
        fontWeight: 500,
        border: '1px solid var(--border-color)',
        minWidth: '100px',
        textAlign: 'center',
      }}>
        {currentPage} / {totalPages}
      </div>

      {/* 下一页 */}
      <button
        onClick={() => handleClick(currentPage + 1, 'next')}
        disabled={currentPage === totalPages}
        style={{
          padding: '10px 20px',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          background: currentPage === totalPages ? 'var(--button-disabled-bg)' : 'var(--card-bg)',
          color: currentPage === totalPages ? 'var(--text-tertiary)' : 'var(--text-primary)',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          fontSize: '15px',
          fontWeight: 500,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: pressedButton === 'next' ? 'scale(0.95)' : 'scale(1)',
          boxShadow: pressedButton === 'next'
            ? '0 2px 8px rgba(0, 0, 0, 0.12)'
            : '0 4px 12px rgba(0, 0, 0, 0.08)',
        }}
        onMouseEnter={(e) => {
          if (currentPage !== totalPages) {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.12)'
          }
        }}
        onMouseLeave={(e) => {
          if (pressedButton !== 'next') {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.08)'
          }
        }}
      >
        下一页 →
      </button>
    </div>
  )
}
