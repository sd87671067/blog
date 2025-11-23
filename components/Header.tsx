'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const navItems = [
    { name: '主页', href: '/' },
    { name: '分类', href: '/categories' },
    { name: '标签', href: '/tags' },
    { name: '搜索', href: '/search' },
  ]

  const toggleTheme = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('theme', newIsDark ? 'dark' : 'light')
  }

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        width: '100%',
        borderBottom: '0.5px solid var(--border-color)',
        backgroundColor: 'var(--header-bg)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          height: '52px',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
        }}>
          {/* 汉堡菜单 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '44px',
              height: '44px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
            aria-label="Menu"
          >
            <span style={{
              width: '20px',
              height: '2px',
              backgroundColor: 'var(--text-primary)',
              borderRadius: '2px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: mobileMenuOpen ? 'rotate(45deg) translateY(7px)' : 'none',
            }} />
            <span style={{
              width: '20px',
              height: '2px',
              backgroundColor: 'var(--text-primary)',
              borderRadius: '2px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              opacity: mobileMenuOpen ? 0 : 1,
            }} />
            <span style={{
              width: '20px',
              height: '2px',
              backgroundColor: 'var(--text-primary)',
              borderRadius: '2px',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: mobileMenuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none',
            }} />
          </button>

          {/* 夜间模式 */}
          <button
            onClick={toggleTheme}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: 'var(--button-bg)',
              cursor: 'pointer',
              fontSize: '16px',
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
            aria-label="Toggle theme"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--button-hover-bg)'
              e.currentTarget.style.transform = 'scale(1.05)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--button-bg)'
              e.currentTarget.style.transform = 'scale(1)'
            }}
          >
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* 下拉菜单 - 增强毛玻璃 */}
      <div style={{
        position: 'fixed',
        top: '52px',
        left: 0,
        right: 0,
        backgroundColor: 'var(--header-bg)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '0.5px solid var(--border-color)',
        transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: mobileMenuOpen ? 1 : 0,
        pointerEvents: mobileMenuOpen ? 'auto' : 'none',
        zIndex: 40,
        boxShadow: mobileMenuOpen ? '0 10px 30px rgba(0,0,0,0.1)' : 'none',
      }}>
        <nav style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                padding: '16px 20px',
                fontSize: '17px',
                fontWeight: 500,
                color: pathname === item.href ? '#007AFF' : 'var(--text-primary)',
                textDecoration: 'none',
                borderRadius: '12px',
                backgroundColor: pathname === item.href ? 'rgba(0, 122, 255, 0.1)' : 'transparent',
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                animation: mobileMenuOpen ? `slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s backwards` : 'none',
              }}
              onMouseEnter={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.backgroundColor = 'var(--hover-bg)'
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.backgroundColor = 'transparent'
                }
              }}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <style jsx global>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  )
}
