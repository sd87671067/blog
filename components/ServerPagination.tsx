'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useState, useEffect, useTransition } from 'react'

interface ServerPaginationProps {
  currentPage: number
  totalPages: number
}

export default function ServerPagination({ currentPage, totalPages }: ServerPaginationProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [hoveredButton, setHoveredButton] = useState<string | null>(null)
  const [pressedButton, setPressedButton] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(false)
  const [isPending, startTransition] = useTransition()

  // 检测深色模式
  useEffect(() => {
    const checkDarkMode = () => {
      const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      setIsDark(isDarkMode)
    }
    
    checkDarkMode()
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addEventListener('change', checkDarkMode)
    
    return () => mediaQuery.removeEventListener('change', checkDarkMode)
  }, [])

  const handleClick = (page: number, type: string) => {
    if ((type === 'prev' && currentPage === 1) || (type === 'next' && currentPage === totalPages)) {
      return
    }
    
    console.log('点击翻页:', page, '当前页:', currentPage)
    setPressedButton(type)
    
    // 方法1: 使用 startTransition 和 router.push
    startTransition(() => {
      const newUrl = `${pathname}?page=${page}`
      console.log('跳转到:', newUrl)
      router.push(newUrl)
    })
    
    // 延迟重置按钮状态
    setTimeout(() => {
      setPressedButton(null)
    }, 300)
  }

  // 方法2: 使用 Link 的 href 作为备用
  const getPrevHref = () => currentPage > 1 ? `/posts?page=${currentPage - 1}` : '#'
  const getNextHref = () => currentPage < totalPages ? `/posts?page=${currentPage + 1}` : '#'

  const buttonStyle = (isDisabled: boolean, buttonType: string) => ({
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
    background: isDisabled
      ? isDark 
        ? 'rgba(255, 255, 255, 0.05)'
        : 'rgba(0, 0, 0, 0.04)'
      : hoveredButton === buttonType
        ? isDark
          ? 'rgba(255, 255, 255, 0.15)'
          : 'rgba(0, 0, 0, 0.08)'
        : isDark
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.05)',
    color: isDisabled 
      ? isDark
        ? 'rgba(255, 255, 255, 0.2)'
        : 'rgba(0, 0, 0, 0.2)' 
      : isDark
        ? 'rgba(255, 255, 255, 0.8)'
        : 'rgba(0, 0, 0, 0.6)',
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
    boxShadow: isDisabled 
      ? 'none' 
      : isDark
        ? '0 2px 8px rgba(0, 0, 0, 0.3)'
        : '0 2px 8px rgba(0, 0, 0, 0.06)',
    textDecoration: 'none',
  })

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '12px',
    }}>
      {/* 上一页 - 使用 a 标签作为备用 */}
      <a
        href={getPrevHref()}
        onClick={(e) => {
          if (currentPage === 1) {
            e.preventDefault()
            return
          }
          e.preventDefault()
          handleClick(currentPage - 1, 'prev')
        }}
        onMouseEnter={() => setHoveredButton('prev')}
        onMouseLeave={() => setHoveredButton(null)}
        style={buttonStyle(currentPage === 1, 'prev')}
        aria-label="上一页"
        aria-disabled={currentPage === 1}
      >
        ‹
      </a>

      {/* 页码 */}
      <div style={{
        padding: '0 16px',
        height: '44px',
        borderRadius: '22px',
        border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
        background: isDark 
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.04)',
        color: isDark
          ? 'rgba(255, 255, 255, 0.8)'
          : 'rgba(0, 0, 0, 0.6)',
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
        {isPending && <span style={{ marginLeft: '4px' }}>...</span>}
      </div>

      {/* 下一页 - 使用 a 标签作为备用 */}
      <a
        href={getNextHref()}
        onClick={(e) => {
          if (currentPage === totalPages) {
            e.preventDefault()
            return
          }
          e.preventDefault()
          handleClick(currentPage + 1, 'next')
        }}
        onMouseEnter={() => setHoveredButton('next')}
        onMouseLeave={() => setHoveredButton(null)}
        style={buttonStyle(currentPage === totalPages, 'next')}
        aria-label="下一页"
        aria-disabled={currentPage === totalPages}
      >
        ›
      </a>
    </div>
  )
}
