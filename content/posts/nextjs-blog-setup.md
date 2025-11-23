---
title: "Next.js 博客搭建完整教程"
date: "2025-11-22"
tags: ["Next.js", "教程", "博客", "Web开发"]
category: "技术"
description: "从零开始搭建一个功能完整的 Next.js 博客系统，包括 Markdown 支持、暗色模式、SEO 优化等。"
---

# Next.js 博客搭建完整教程

本文将详细介绍如何从零开始搭建一个功能完整的 Next.js 博客系统。

## 📋 技术选型

### 核心技术栈

- **Next.js 14+** - React 框架，支持 SSG/SSR
- **TypeScript** - 类型安全
- **Tailwind CSS** - 实用优先的 CSS 框架
- **Markdown** - 内容格式

### 功能库

- `gray-matter` - 解析 Front Matter
- `remark` / `rehype` - Markdown 处理
- `reading-time` - 阅读时间估算
- `date-fns` - 日期格式化

## 🏗️ 项目结构

```
blog/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # 全局布局
│   ├── page.tsx           # 首页
│   ├── posts/             # 文章页面
│   ├── tags/              # 标签页面
│   └── api/               # API 路由
├── components/            # React 组件
├── lib/                   # 工具函数
├── content/               # Markdown 文章
└── public/                # 静态资源
```

## 🚀 快速开始

### 1. 初始化项目

```bash
npx create-next-app@latest my-blog --typescript --tailwind --app
cd my-blog
```

### 2. 安装依赖

```bash
npm install gray-matter remark remark-html rehype-highlight \
  reading-time date-fns unified remark-parse remark-rehype \
  rehype-stringify @tailwindcss/typography
```

### 3. 配置 Tailwind CSS

更新 `tailwind.config.ts`：

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // 自定义主题
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
export default config;
```

## 📝 核心功能实现

### 文章数据处理

创建 `lib/posts.ts`：

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface Post {
  slug: string;
  title: string;
  date: string;
  content: string;
  // ... 其他字段
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames.map(fileName => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      ...data,
      content,
      readingTime: readingTime(content).text,
    } as Post;
  });
  
  return posts.sort((a, b) => 
    a.date > b.date ? -1 : 1
  );
}
```

### Markdown 转 HTML

创建 `lib/markdown.ts`：

```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';

export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown);

  return result.toString();
}
```

### 文章详情页面

创建 `app/posts/[slug]/page.tsx`：

```typescript
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  const post = await getPostBySlug(params.slug);
  const htmlContent = await markdownToHtml(post.content);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </article>
  );
}
```

## 🎨 暗色模式实现

### 1. 创建主题切换组件

```typescript
'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.documentElement.classList.toggle('dark', saved === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button onClick={toggleTheme}>
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
```

### 2. 配置 CSS 变量

```css
:root {
  --background: #ffffff;
  --foreground: #000000;
}

.dark {
  --background: #0a0a0a;
  --foreground: #ffffff;
}

body {
  background: var(--background);
  color: var(--foreground);
}
```

## 🔍 搜索功能

创建 API 路由 `app/api/search/route.ts`：

```typescript
import { NextResponse } from 'next/server';
import { getAllPosts } from '@/lib/posts';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q')?.toLowerCase();

  if (!query) {
    return NextResponse.json([]);
  }

  const posts = getAllPosts();
  const results = posts.filter(post =>
    post.title.toLowerCase().includes(query) ||
    post.description.toLowerCase().includes(query)
  );

  return NextResponse.json(results);
}
```

## 📊 SEO 优化

### 1. Meta 标签

```typescript
export const metadata: Metadata = {
  title: '我的博客',
  description: '技术博客',
  openGraph: {
    title: '我的博客',
    description: '技术博客',
    type: 'website',
  },
};
```

### 2. Sitemap 生成

创建 `app/sitemap.ts`：

```typescript
import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  
  const postUrls = posts.map(post => ({
    url: `https://yourdomain.com/posts/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [
    {
      url: 'https://yourdomain.com',
      lastModified: new Date(),
    },
    ...postUrls,
  ];
}
```

### 3. RSS 订阅

创建 `app/rss.xml/route.ts` 生成 RSS feed。

## 🚢 部署

### Vercel 部署（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

### Docker 部署

```dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
```

## ✅ 性能优化

### 1. 静态生成

使用 `generateStaticParams` 预生成所有页面：

```typescript
export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map(post => ({ slug: post.slug }));
}
```

### 2. 图片优化

使用 Next.js Image 组件：

```typescript
import Image from 'next/image';

<Image
  src="/images/example.jpg"
  alt="示例图片"
  width={800}
  height={600}
  priority
/>
```

### 3. 代码分割

Next.js 自动进行代码分割，按需加载。

## 🎯 最佳实践

1. **使用 TypeScript** - 提供类型安全
2. **静态生成优先** - 更好的性能
3. **响应式设计** - 适配各种设备
4. **SEO 优化** - 提升搜索引擎排名
5. **代码质量** - 保持代码整洁

## 📚 扩展阅读

- [Next.js 官方文档](https://nextjs.org/docs)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [Markdown 指南](https://www.markdownguide.org/)

## 🎉 总结

通过本教程，你已经学会了：

- ✅ 搭建 Next.js 项目
- ✅ 实现 Markdown 博客
- ✅ 添加暗色模式
- ✅ 实现搜索功能
- ✅ SEO 优化
- ✅ 部署上线

现在你可以开始创作自己的博客内容了！

---

**相关文章：**
- [欢迎来到我的博客](/posts/welcome)
- [Markdown 写作指南](/posts/markdown-guide)
