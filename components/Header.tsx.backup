'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const updateTheme = (e: MediaQueryListEvent | MediaQueryList) => {
      if (e.matches) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
    
    updateTheme(mediaQuery)
    mediaQuery.addEventListener('change', updateTheme)
    
    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [])

  const navItems = [
    { name: '主页', href: '/' },
    { name: '文章', href: '/posts' },
    { name: '标签', href: '/tags' },
    { name: '搜索', href: '#', action: 'search' },
  ]

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.action === 'search') {
      setSearchOpen(true)
      setMobileMenuOpen(false)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
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

          <div style={{ width: '44px' }} />
        </div>
      </header>

      {/* 搜索栏 */}
      <div style={{
        position: 'fixed',
        top: '52px',
        left: 0,
        right: 0,
        backgroundColor: 'var(--header-bg)',
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        borderBottom: '0.5px solid var(--border-color)',
        transform: searchOpen ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        opacity: searchOpen ? 1 : 0,
        zIndex: 45,
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
        }}>
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '12px' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索文章..."
              autoFocus
              style={{
                flex: 1,
                padding: '12px 20px',
                borderRadius: '12px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--card-bg)',
                color: 'var(--text-primary)',
                fontSize: '16px',
                outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: '#007AFF',
                color: '#fff',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '0.8'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
            >
              搜索
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              style={{
                padding: '12px 24px',
                borderRadius: '12px',
                border: 'none',
                backgroundColor: 'var(--button-bg)',
                color: 'var(--text-primary)',
                fontSize: '16px',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--button-hover-bg)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--button-bg)'}
            >
              取消
            </button>
          </form>
        </div>
      </div>

      {/* 下拉菜单 */}
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
            item.action === 'search' ? (
              <button
                key="search"
                onClick={() => handleNavClick(item)}
                style={{
                  padding: '16px 20px',
                  fontSize: '17px',
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  textDecoration: 'none',
                  textAlign: 'left',
                  borderRadius: '12px',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                  animation: mobileMenuOpen ? `slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s backwards` : 'none',
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--hover-bg)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {item.name}
              </button>
            ) : (
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
            )
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
