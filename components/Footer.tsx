'use client';

import Link from 'next/link';
import { CSSProperties, useState } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerStyle: CSSProperties = {
    borderTop: '1px solid #e5e7eb',
    backgroundColor: '#fff',
  };

  const containerStyle: CSSProperties = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '32px 16px',
  };

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '32px',
  };

  const sectionTitleStyle: CSSProperties = {
    fontWeight: '600',
    marginBottom: '12px',
    fontSize: '16px',
  };

  const textStyle: CSSProperties = {
    fontSize: '14px',
    color: '#666',
    lineHeight: '1.6',
  };

  const listStyle: CSSProperties = {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  };

  const listItemStyle: CSSProperties = {
    marginBottom: '8px',
  };

  const bottomStyle: CSSProperties = {
    marginTop: '32px',
    paddingTop: '32px',
    borderTop: '1px solid #e5e7eb',
    textAlign: 'center',
    fontSize: '14px',
    color: '#666',
  };

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com',
      icon: (
        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      )
    },
    {
      name: 'Email',
      url: 'mailto:contact@example.com',
      icon: (
        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      )
    },
    {
      name: 'MQL5',
      url: 'https://www.mql5.com',
      icon: (
        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      )
    },
    {
      name: 'Exness',
      url: 'https://www.exness.com',
      icon: (
        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      )
    },
    {
      name: 'Telegram',
      url: 'https://telegram.org',
      icon: (
        <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      )
    }
  ];

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={gridStyle} className="md:grid-cols-3">
          <div>
            <h3 style={sectionTitleStyle}>关于</h3>
            <p style={textStyle}>
              一个基于 Next.js 的现代化博客系统，专注于内容创作。
            </p>
          </div>
          <div>
            <h3 style={sectionTitleStyle}>链接</h3>
            <ul style={listStyle}>
              <li style={listItemStyle}>
                <FooterLink href="/">首页</FooterLink>
              </li>
              <li style={listItemStyle}>
                <FooterLink href="/posts">文章</FooterLink>
              </li>
              <li style={listItemStyle}>
                <FooterLink href="/tags">标签</FooterLink>
              </li>
              <li style={listItemStyle}>
                <FooterLink href="/rss.xml">RSS 订阅</FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 style={sectionTitleStyle}>社交</h3>
            <ul style={listStyle}>
              {socialLinks.map((link) => (
                <li key={link.name} style={listItemStyle}>
                  <SocialLink href={link.url} icon={link.icon}>
                    {link.name}
                  </SocialLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={bottomStyle}>
          <p>&copy; {currentYear} 我的博客. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle: CSSProperties = {
    fontSize: '14px',
    color: isHovered ? '#000' : '#666',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
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

function SocialLink({ href, icon, children }: { href: string; icon: React.ReactNode; children: React.ReactNode }) {
  const [isHovered, setIsHovered] = useState(false);

  const linkStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: isHovered ? '#000' : '#666',
    textDecoration: 'none',
    transition: 'color 0.2s ease',
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={linkStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {icon}
      <span>{children}</span>
    </a>
  );
}
