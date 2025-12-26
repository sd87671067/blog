# 仿IOS动画风格，官网字体配色的博客系统

一个功能完整、易于维护、现代化的博客系统，基于 Next.js 14+ 构建，适合部署在独享 VPS 上。

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3+-38B2AC?style=flat-square&logo=tailwind-css)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker)

## ✨ 功能特性
## demo:https://dlmn.lol
### 📚 核心功能
- ✅ **Markdown 文章系统** - 使用 Markdown 编写文章，支持 Front Matter 元数据
- ✅ **代码高亮** - 支持多种编程语言的语法高亮
- ✅ **标签和分类** - 灵活的文章组织方式
- ✅ **文章目录** - 自动生成可导航的目录
- ✅ **搜索功能** - 快速搜索文章内容
- ✅ **阅读时间** - 自动计算文章阅读时间
- ✅ **相邻文章导航** - 上一篇/下一篇文章导航

### 🎨 用户体验
- ✅ **响应式设计** - 完美适配手机、平板、桌面
- ✅ **暗色/亮色主题** - 支持主题切换，自动保存偏好
- ✅ **现代化 UI** - 简洁优雅的设计
- ✅ **平滑动画** - 流畅的页面过渡效果

### 🚀 性能优化
- ✅ **静态生成** - 使用 SSG 预渲染所有页面
- ✅ **图片优化** - Next.js Image 组件自动优化
- ✅ **代码分割** - 按需加载，优化首屏速度
- ✅ **缓存策略** - Nginx 缓存静态资源

### 🔍 SEO 优化
- ✅ **Meta 标签** - 完整的元数据支持
- ✅ **Open Graph** - 社交媒体分享优化
- ✅ **Sitemap** - 自动生成站点地图
- ✅ **RSS 订阅** - 标准 RSS 2.0 支持

## 📦 技术栈

- **前端框架**: Next.js 14+ (App Router)
- **开发语言**: TypeScript
- **样式方案**: Tailwind CSS
- **内容格式**: Markdown
- **代码高亮**: rehype-highlight
- **部署方案**: Docker + Nginx

## 🚀 快速开始

### 环境要求

- Node.js 18+
- npm 或 yarn
- Docker (用于容器化部署)

### 本地开发

1. **一键配置脚本（推荐第二个）**

```bash
curl -fsSL https://raw.githubusercontent.com/sd87671067/blog/main/deploy-to-vps.sh | bash
```
```bash
wget https://raw.githubusercontent.com/sd87671067/blog/main/deploy-to-vps.sh
chmod +x deploy-to-vps.sh
./deploy-to-vps.sh
```

2. **访问应用**

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

### 构建生产版本

```bash
npm run build
npm start
```

## 📝 内容管理

### 添加新文章

1. 在 `content/posts/` 目录下创建新的 `.md` 文件
2. 添加 Front Matter 元数据和内容

```markdown
---
title: "文章标题"
date: "2025-11-23"
tags: ["标签1", "标签2"]
category: "分类名称"
description: "文章描述"
cover: "/images/cover.jpg"
---

# 文章内容

这里是文章正文...
```

### Front Matter 字段说明

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| title | string | 是 | 文章标题 |
| date | string | 是 | 发布日期 (YYYY-MM-DD) |
| tags | array | 否 | 标签列表 |
| category | string | 否 | 文章分类 |
| description | string | 否 | 文章描述/摘要 |
| cover | string | 否 | 封面图片路径 |

### 图片管理

- 将图片放在 `public/images/` 目录
- 在 Markdown 中使用相对路径引用：`![描述](/images/example.jpg)`

## 🐳 Docker 部署

### 方式一：使用部署脚本（推荐）

```bash
# 一键部署
./deploy.sh
```

部署脚本会自动完成：
- ✅ 环境检查
- ✅ 代码更新
- ✅ 镜像构建
- ✅ 服务启动
- ✅ 健康检查

### 方式二：手动部署

```bash
# 构建镜像
docker-compose build

# 启动服务
docker-compose up -d

# 查看日志
docker logs -f nextjs-blog

# 停止服务
docker-compose down
```

### Docker 命令速查

```bash
# 查看运行状态
docker-compose ps

# 查看实时日志
docker logs -f nextjs-blog

# 重启服务
docker-compose restart

# 进入容器
docker exec -it nextjs-blog sh

# 清理未使用的镜像
docker image prune -f
```

## 🌐 VPS 部署指南

### 服务器要求

- **操作系统**: Ubuntu 20.04+ / Debian 11+ / CentOS 8+
- **内存**: 至少 1GB RAM
- **存储**: 至少 10GB 可用空间
- **网络**: 公网 IP 地址

### 部署步骤

#### 1. 安装 Docker

```bash
# Ubuntu/Debian
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

#### 2. 克隆项目

```bash
git clone https://github.com/yourusername/blog.git
cd blog
```

#### 3. 配置环境变量

```bash
cp .env.example .env
# 编辑 .env 文件，设置你的域名等信息
nano .env
```

#### 4. 部署应用

```bash
chmod +x deploy.sh
./deploy.sh
```

#### 5. 配置域名（可选）

编辑 `nginx.conf`，修改 server_name 为你的域名，并配置 SSL 证书。

### SSL 证书配置

使用 Let's Encrypt 免费证书：

```bash
# 安装 certbot
sudo apt install certbot

# 获取证书
sudo certbot certonly --standalone -d yourdomain.com

# 证书会保存在 /etc/letsencrypt/live/yourdomain.com/
# 将证书路径配置到 nginx.conf 中
```

## 🔄 更新文章

### Git 工作流

```bash
# 1. 在 content/posts/ 添加或修改文章

# 2. 提交更改
git add content/posts/
git commit -m "添加新文章: 文章标题"

# 3. 推送到远程仓库
git push origin main

# 4. 在服务器上更新
cd /path/to/blog
./deploy.sh
```

### 自动化部署（可选）

配置 GitHub Actions 实现自动部署：

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /path/to/blog
            ./deploy.sh
```

## ⚙️ 配置说明

### 环境变量

在 `.env` 文件中配置：

```env
# 站点信息
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_NAME=我的博客
NEXT_PUBLIC_SITE_DESCRIPTION=一个基于 Next.js 的现代化博客系统
NEXT_PUBLIC_AUTHOR_NAME=Your Name
NEXT_PUBLIC_AUTHOR_EMAIL=your.email@example.com

# 生产环境
NODE_ENV=production
```

### 自定义配置

- **主题颜色**: 编辑 `app/globals.css` 中的 CSS 变量
- **导航菜单**: 编辑 `components/Header.tsx`
- **页脚信息**: 编辑 `components/Footer.tsx`
- **Tailwind 配置**: 编辑 `tailwind.config.ts`

## 🛠️ 故障排查

### 常见问题

**Q: 端口 3000 被占用**
```bash
# 查找占用端口的进程
lsof -i :3000
# 杀死进程
kill -9 <PID>
```

**Q: Docker 容器无法启动**
```bash
# 查看详细日志
docker logs nextjs-blog

# 检查容器状态
docker ps -a

# 重新构建
docker-compose build --no-cache
```

**Q: 样式不生效**
```bash
# 清除缓存重新构建
rm -rf .next
npm run build
```

**Q: Markdown 渲染异常**

检查文章的 Front Matter 格式是否正确，特别是日期格式。

### 查看日志

```bash
# 应用日志
docker logs -f nextjs-blog

# Nginx 日志
docker logs -f nginx-proxy

# 查看最近 100 行日志
docker logs --tail 100 nextjs-blog
```

## 📂 项目结构

```
blog/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # 全局布局
│   ├── page.tsx             # 首页
│   ├── posts/               # 文章相关页面
│   │   ├── page.tsx        # 文章列表
│   │   └── [slug]/         # 文章详情
│   ├── tags/                # 标签页面
│   ├── categories/          # 分类页面
│   ├── api/                 # API 路由
│   ├── sitemap.ts          # Sitemap 生成
│   └── not-found.tsx       # 404 页面
├── components/              # React 组件
│   ├── Header.tsx          # 头部导航
│   ├── Footer.tsx          # 页脚
│   ├── PostCard.tsx        # 文章卡片
│   ├── MDXContent.tsx      # Markdown 渲染
│   ├── ThemeToggle.tsx     # 主题切换
│   ├── SearchBar.tsx       # 搜索栏
│   └── TableOfContents.tsx # 目录
├── lib/                     # 工具函数
│   ├── posts.ts            # 文章处理
│   ├── markdown.ts         # Markdown 解析
│   └── utils.ts            # 通用工具
├── content/                 # 内容目录
│   └── posts/              # Markdown 文章
├── public/                  # 静态资源
│   └── images/             # 图片资源
├── Dockerfile              # Docker 配置
├── docker-compose.yml      # Docker Compose
├── nginx.conf              # Nginx 配置
├── deploy.sh               # 部署脚本
└── README.md               # 项目文档
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🙏 致谢

- [Next.js](https://nextjs.org/) - React 框架
- [Tailwind CSS](https://tailwindcss.com/) - CSS 框架
- [Vercel](https://vercel.com/) - 部署平台
- 所有开源贡献者

## 📞 联系方式

- GitHub: [@sd87671067](https://github.com/yourusername)
- Email: cwsdfd@icloud.com
- 博客: https://dlmn.lol

---

⭐️ 如果这个项目对你有帮助，请给它一个 Star！
