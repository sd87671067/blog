'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import { CSSProperties, useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const headerStyle: CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 50,
    width: '100%',
    borderBottom: '1px solid #e5e7eb',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(8px)',
  };

  const containerStyle: CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    height: '64px',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 16px',
  };

  const leftSideStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '24px',
  };

  const logoStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    textDecoration: 'none',
  };

  const logoTextStyle: CSSProperties = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#000',
  };

  const desktopNavStyle: CSSProperties = {
    display: 'flex',
    gap: '24px',
  };

  const mobileMenuButtonStyle: CSSProperties = {
    display: 'block',
    width: '44px',
    height: '44px',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    padding: '10px',
    position: 'relative',
  };

  const hamburgerLineStyle: CSSProperties = {
    display: 'block',
    width: '24px',
    height: '2px',
    backgroundColor: '#000',
    margin: '5px auto',
    transition: 'all 0.3s ease',
    borderRadius: '2px',
  };

  const dropdownStyle: CSSProperties = {
    position: 'absolute',
    top: '64px',
    right: '16px',
    backgroundColor: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    minWidth: '200px',
    padding: '8px',
    animation: 'slideDown 0.3s ease',
  };

  const dropdownItemStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    borderRadius: '4px',
    textDecoration: 'none',
    color: '#000',
    transition: 'background-color 0.2s ease',
  };

  const iconStyle: CSSProperties = {
    width: '20px',
    height: '20px',
  };

  const rightSideStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  };

  const navLinks = [
    { path: '/', label: '首页', icon: '🏠' },
    { path: '/posts', label: '文章', icon: '📝' },
    { path: '/tags', label: '标签', icon: '🏷️' },
  ];

  return (
    <header style={headerStyle}>
      <div style={containerStyle}>
        <div style={leftSideStyle}>
          <Link href="/" style={logoStyle}>
            <span style={logoTextStyle}>📝 我的博客</span>
          </Link>
          {/* Desktop Navigation */}
          <nav style={{ ...desktopNavStyle, display: 'none' }} className="md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                href={link.path}
                isActive={isActive(link.path)}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
        <div style={rightSideStyle}>
          <ThemeToggle />
          {/* Mobile Menu Button */}
          <button
            style={mobileMenuButtonStyle}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            className="md:hidden"
          >
            <span style={{
              ...hamburgerLineStyle,
              transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
            }} />
            <span style={{
              ...hamburgerLineStyle,
              opacity: isMenuOpen ? 0 : 1,
            }} />
            <span style={{
              ...hamburgerLineStyle,
              transform: isMenuOpen ? 'rotate(-45deg) translate(7px, -7px)' : 'none',
            }} />
          </button>
        </div>
      </div>
      
      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div style={dropdownStyle} className="md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              style={{
                ...dropdownItemStyle,
                backgroundColor: isActive(link.path) ? '#f3f4f6' : 'transparent',
              }}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={(e) => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive(link.path)) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <span style={iconStyle}>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function NavLink({ href, isActive, children }: { href: string; isActive: boolean; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle: CSSProperties = {
    fontSize: '14px',
    fontWeight: '500',
    transition: 'color 0.2s ease',
    color: isActive ? '#000' : (isHovered ? '#0070f3' : 'rgba(0, 0, 0, 0.6)'),
    textDecoration: 'none',
  };

  return (
    <Link
      href={href}
      style={linkStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </Link>
  );
}
