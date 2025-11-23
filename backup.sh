#!/bin/bash

# 博客备份脚本
# 作者: 孤独的交易员

set -e

BACKUP_DIR="$HOME/blog-backups"
DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_FILE="$BACKUP_DIR/blog_backup_$DATE.tar.gz"

echo "================================================"
echo "  💾 博客备份脚本"
echo "================================================"
echo ""

# 创建备份目录
mkdir -p "$BACKUP_DIR"

# 备份
echo "📦 正在备份..."
tar -czf "$BACKUP_FILE" \
    --exclude='node_modules' \
    --exclude='.next' \
    --exclude='.git' \
    content/ public/ components/ app/ lib/ *.md *.json *.yml *.ts* 2>/dev/null || true

echo ""
echo "✅ 备份完成！"
echo "📁 备份文件: $BACKUP_FILE"
echo "📊 文件大小: $(du -h $BACKUP_FILE | cut -f1)"
echo ""

# 列出所有备份
echo "📋 所有备份文件:"
ls -lh "$BACKUP_DIR"
echo ""
