#!/bin/bash

# 博客页脚优化一键部署脚本
# 作者: 孤独的交易员
# 日期: 2025-11-23

set -e

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}================================================${NC}"
echo -e "${BLUE}  🚀 博客页脚优化一键部署脚本${NC}"
echo -e "${BLUE}  by 孤独的交易员${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""

# 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ 错误: 请在 /root/blog 目录下运行此脚本${NC}"
    exit 1
fi

# 步骤 1: 创建稳定版本标签（备份）
echo -e "${GREEN}📌 步骤 1/6: 创建稳定版本标签...${NC}"
CURRENT_COMMIT=$(git rev-parse HEAD)
BACKUP_TAG="stable-$(date +%Y%m%d-%H%M%S)"
git tag -a "$BACKUP_TAG" -m "Stable version before footer update - $(date '+%Y-%m-%d %H:%M:%S')"
echo -e "   ✅ 已创建稳定版本标签: ${BLUE}$BACKUP_TAG${NC}"
echo -e "   📝 当前 commit: ${BLUE}${CURRENT_COMMIT:0:8}${NC}"
echo ""

# 步骤 2: 备份当前文件
echo -e "${GREEN}💾 步骤 2/6: 备份当前文件...${NC}"
BACKUP_DIR="$HOME/blog-backups"
mkdir -p "$BACKUP_DIR"
BACKUP_FILE="$BACKUP_DIR/footer_backup_$(date +%Y%m%d_%H%M%S).tar.gz"
tar -czf "$BACKUP_FILE" components/Footer.tsx
echo -e "   ✅ 已备份到: ${BLUE}$BACKUP_FILE${NC}"
echo ""

# 步骤 3: 更新 Footer.tsx
echo -e "${GREEN}✏️  步骤 3/6: 更新 Footer.tsx 文件...${NC}"
cat > components/Footer.tsx << 'FOOTER_EOF'
'use client'

export default function Footer() {
  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/sd87671067',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      ),
    },
    {
      name: 'Email',
      href: 'mailto:cwsdfd@icloud.com',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
          <polyline points="22,6 12,13 2,6"/>
        </svg>
      ),
    },
    {
      name: 'MQL5',
      href: 'https://www.mql5.com/zh/signals/2344273?source=Site+Signals+My#!tab=account',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      ),
    },
    {
      name: 'Exness',
      href: 'https://social-trading.exness.com/strategy/227951424/?utm_source=partners&sharer=trader&_8f4x=1',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
    {
      name: 'Telegram',
      href: 'https://t.me/cyklol',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      ),
    },
  ]

  return (
    <footer style={{
      borderTop: '1px solid var(--border-color)',
      backgroundColor: 'var(--footer-bg)',
      padding: '48px 20px',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '32px',
      }}>
        {/* 社交图标 - 横向排列 */}
        <div style={{
          display: 'flex',
          gap: '32px',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: 'var(--icon-bg)',
                color: 'var(--text-secondary)',
                textDecoration: 'none',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(0, 122, 255, 0.1)'
                e.currentTarget.style.color = '#007AFF'
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.1)'
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 122, 255, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--icon-bg)'
                e.currentTarget.style.color = 'var(--text-secondary)'
                e.currentTarget.style.transform = 'translateY(0) scale(1)'
                e.currentTarget.style.boxShadow = 'none'
              }}
              aria-label={link.name}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* 格言 */}
        <div style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          fontStyle: 'italic',
          maxWidth: '600px',
          lineHeight: 1.6,
          padding: '0 20px',
        }}>
          "技术可以让你后退一步研究市场，避免被负面情绪影响"
        </div>

        {/* 新增的跟随说明 */}
        <div style={{
          fontSize: '15px',
          color: 'var(--text-secondary)',
          textAlign: 'center',
          fontStyle: 'italic',
          maxWidth: '600px',
          lineHeight: 1.6,
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}>
          <span>点击上方的第三个和第四个按钮，都可以跟随我交易</span>
          <span style={{
            display: 'inline-block',
            color: '#FF3B30',
            animation: 'heartbeat 1.2s ease-in-out infinite',
          }}>
            ❤️
          </span>
        </div>

        {/* 版权信息 */}
        <div style={{
          fontSize: '13px',
          color: 'var(--text-tertiary)',
          textAlign: 'center',
        }}>
          <p>© {new Date().getFullYear()} by 孤独的交易员. All rights reserved.</p>
        </div>
      </div>

      {/* CSS 动画 */}
      <style jsx>{`
        @keyframes heartbeat {
          0%, 100% {
            transform: scale(1);
          }
          10%, 30% {
            transform: scale(1.1);
          }
          20%, 40% {
            transform: scale(1);
          }
        }
      `}</style>
    </footer>
  )
}
FOOTER_EOF

echo -e "   ✅ Footer.tsx 已更新${NC}"
echo ""

# 步骤 4: 提交更改
echo -e "${GREEN}📝 步骤 4/6: 提交更改到 Git...${NC}"
git add components/Footer.tsx
git commit -m "优化页脚：添加跟随交易提示和跳动爱心动画

- 在格言下方添加跟随交易说明文字
- 添加红色跳动爱心动画效果
- 字体大小与格言保持一致（15px）
- 保持居中对齐和斜体样式

优化日期: $(date '+%Y-%m-%d %H:%M:%S')"

echo -e "   ✅ 更改已提交${NC}"
echo ""

# 步骤 5: 推送到远程仓库（可选）
echo -e "${YELLOW}⚠️  是否推送到 GitHub 远程仓库？(y/n) [10秒后自动跳过]${NC}"
read -t 10 -r push_choice || push_choice="n"
if [[ $push_choice =~ ^[Yy]$ ]]; then
    echo -e "${GREEN}📤 推送到远程仓库...${NC}"
    git push origin main || echo -e "${YELLOW}   ⚠️  推送失败，请稍后手动推送${NC}"
    git push origin "$BACKUP_TAG" || echo -e "${YELLOW}   ⚠️  标签推送失败${NC}"
else
    echo -e "   ⏭️  跳过远程推送"
fi
echo ""

# 步骤 6: 重新部署 Docker 容器
echo -e "${GREEN}🐳 步骤 6/6: 重新部署 Docker 容器...${NC}"
echo -e "   停止现有容器..."
docker compose down 2>/dev/null || docker-compose down 2>/dev/null || true

echo -e "   清理旧镜像..."
docker image prune -f

echo -e "   重新构建镜像（无缓存）..."
docker compose build --no-cache 2>/dev/null || docker-compose build --no-cache

echo -e "   启动新容器..."
docker compose up -d 2>/dev/null || docker-compose up -d

echo -e "   等待服务启动..."
for i in {15..1}; do
    echo -ne "   倒计时: $i 秒\r"
    sleep 1
done
echo ""

echo ""

# 检查部署状态
echo -e "${GREEN}🔍 检查部署状态...${NC}"
if docker ps | grep -q nextjs-blog; then
    echo -e "   ✅ 容器运行正常"
    
    # 测试访问
    HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000 2>/dev/null || echo "000")
    if [ "$HTTP_CODE" = "200" ]; then
        echo -e "   ✅ 网站访问正常 (HTTP $HTTP_CODE)"
    else
        echo -e "   ${YELLOW}⚠️  网站访问异常 (HTTP $HTTP_CODE)，可能还在启动中...${NC}"
    fi
else
    echo -e "   ${RED}❌ 容器未运行，请检查日志${NC}"
fi

# 显示容器状态
echo ""
echo -e "${GREEN}📊 容器状态:${NC}"
docker compose ps 2>/dev/null || docker-compose ps 2>/dev/null || docker ps | grep nextjs

echo ""
echo -e "${BLUE}================================================${NC}"
echo -e "${GREEN}  ✅ 部署完成！${NC}"
echo -e "${BLUE}================================================${NC}"
echo ""
echo -e "${GREEN}📊 部署信息:${NC}"
echo -e "   稳定版本标签: ${BLUE}$BACKUP_TAG${NC}"
echo -e "   备份文件: ${BLUE}$BACKUP_FILE${NC}"
echo -e "   当前 commit: ${BLUE}$(git rev-parse --short HEAD)${NC}"
echo ""
echo -e "${GREEN}🌐 访问地址:${NC}"
echo -e "   本地: ${BLUE}http://localhost:3000${NC}"
echo -e "   线上: ${BLUE}https://dlmn.lol${NC}"
echo ""
echo -e "${GREEN}💡 回滚命令（如果出现问题）:${NC}"
echo -e "   ${YELLOW}cd /root/blog${NC}"
echo -e "   ${YELLOW}git checkout $BACKUP_TAG${NC}"
echo -e "   ${YELLOW}docker compose down && docker compose build --no-cache && docker compose up -d${NC}"
echo ""
echo -e "${GREEN}📋 常用命令:${NC}"
echo -e "   查看日志: ${YELLOW}docker compose logs -f${NC}"
echo -e "   重启服务: ${YELLOW}docker compose restart${NC}"
echo -e "   停止服务: ${YELLOW}docker compose down${NC}"
echo -e "   查看状态: ${YELLOW}docker compose ps${NC}"
echo ""
echo -e "${GREEN}🎉 页脚已优化，现在显示跟随交易提示和跳动的爱心！${NC}"
echo ""
