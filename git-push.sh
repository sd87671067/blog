#!/bin/bash

# 快速提交到 Git 脚本
# 作者: 孤独的交易员

set -e

if [ ! -d ".git" ]; then
    echo "❌ 错误: 未检测到 Git 仓库"
    echo "💡 初始化 Git:"
    echo "   git init"
    echo "   git remote add origin https://github.com/sd87671067/blog.git"
    exit 1
fi

echo "================================================"
echo "  📤 提交代码到 Git"
echo "================================================"
echo ""

# 获取提交信息
read -p "📝 提交信息 (留空默认为'更新博客'): " message
if [ -z "$message" ]; then
    message="更新博客"
fi

# 添加所有文件
echo "📦 添加文件..."
git add .

# 提交
echo "💾 提交更改..."
git commit -m "$message" || echo "ℹ️  没有需要提交的更改"

# 推送
echo "📤 推送到远程仓库..."
git push origin main || git push origin master

echo ""
echo "✅ 提交完成！"
echo ""
