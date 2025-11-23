#!/bin/bash

# 快速创建新文章脚本
# 作者: 孤独的交易员

set -e

echo "================================================"
echo "  📝 创建新文章"
echo "================================================"
echo ""

# 获取文章信息
read -p "📌 文章标题: " title
read -p "📁 分类 (例如: 技术/交易): " category
read -p "🏷️  标签 (用逗号分隔，例如: Next.js,博客): " tags
read -p "📄 描述: " description

# 生成文件名（使用拼音或英文）
read -p "📝 文件名 (英文，例如: my-new-post): " slug

# 获取当前日期
DATE=$(date +%Y-%m-%d)

# 创建 Markdown 文件
cat > "content/${slug}.md" << MDEOF
---
title: "${title}"
date: "${DATE}"
category: "${category}"
tags: [${tags}]
description: "${description}"
---

# ${title}

在这里开始写你的文章内容...

## 小标题

文章内容...

\`\`\`javascript
// 代码示例
console.log('Hello World');
\`\`\`

## 总结

总结内容...
MDEOF

echo ""
echo "✅ 文章创建成功！"
echo "📁 文件位置: content/${slug}.md"
echo ""
echo "💡 下一步:"
echo "   1. 编辑文章: nano content/${slug}.md"
echo "   2. 更新博客: ./update-blog.sh"
echo ""
