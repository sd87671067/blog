'use client'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      backgroundColor: 'var(--footer-bg)',
      padding: '32px 20px 24px',
      marginTop: '24px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '24px',
      }}>
        {/* 社交媒体图标 */}
        <div style={{
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          <SocialIcon href="https://github.com/sd87671067" label="GitHub" icon="github" />
          <SocialIcon href="mailto:cwsdfd@icloud.com" label="Email" icon="email" />
          <SocialIcon href="https://www.mql5.com/zh/signals/2344273?source=Site+Signals+My#!tab=account" label="MQL5" icon="mql5" />
          <SocialIcon href="https://social-trading.exness.com/strategy/227998119/?utm_source=partners&sharer=trader&_8f4x=1" label="Exness" icon="exness" />
          <SocialIcon href="https://t.me/cyklol" label="Telegram" icon="telegram" />
        </div>

        {/* 座右铭 */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
        }}>
          <p style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.5,
            fontWeight: 500,
          }}>
            技术交易可以减少负面情绪的影响
          </p>
          <p style={{
            fontSize: '15px',
            color: 'var(--text-secondary)',
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.5,
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            flexWrap: 'wrap',
          }}>
            <span>上方有个按钮可以跟单，跟单需谨慎</span>
            <span style={{
              display: 'inline-block',
              fontSize: '18px',
              animation: 'heartbeat 1.5s ease-in-out infinite',
            }}>
              ❤️
            </span>
          </p>
        </div>

        {/* 版权信息 */}
        <div style={{
          fontSize: '12px',
          color: 'var(--text-tertiary)',
          textAlign: 'center',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)',
          width: '100%',
        }}>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} by 孤独的交易员. All rights reserved.
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          10%, 30% { transform: scale(0.9); }
          20%, 40%, 60%, 80% { transform: scale(1.1); }
          50%, 70% { transform: scale(1.05); }
        }
      `}</style>
    </footer>
  )
}

function SocialIcon({ href, label, icon }: { href: string; label: string; icon: string }) {
  const iconSvg = {
    github: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z',
    email: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6',
    mql5: 'M22 12 18 12 15 21 9 3 6 12 2 12',
    exness: 'M12 1v22 M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6',
    telegram: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z',
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        borderRadius: '12px',
        backgroundColor: 'var(--icon-bg)',
        color: 'var(--text-secondary)',
        textDecoration: 'none',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)'
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d={iconSvg[icon as keyof typeof iconSvg]} />
      </svg>
    </a>
  )
}
