#!/bin/bash

# 博客一键更新脚本
# 作者: 孤独的交易员
# 使用方法: ./update-blog.sh

set -e

echo "================================================"
echo "  📝 博客一键更新脚本"
echo "  by 孤独的交易员"
echo "================================================"
echo ""

# 1. 检查是否在正确的目录
if [ ! -f "package.json" ]; then
    echo "❌ 错误: 请在 ~/blog 目录下运行此脚本"
    exit 1
fi

# 2. 拉取最新代码（如果使用 Git）
echo "📥 步骤 1/5: 检查 Git 更新..."
if [ -d ".git" ]; then
    git pull origin main || echo "⚠️  Git 拉取失败或未配置远程仓库"
else
    echo "ℹ️  未检测到 Git 仓库，跳过此步骤"
fi
echo ""

# 3. 停止现有容器
echo "🛑 步骤 2/5: 停止现有容器..."
docker compose down
echo ""

# 4. 清理旧镜像（可选，节省空间）
echo "🧹 步骤 3/5: 清理旧镜像..."
docker image prune -f
echo ""

# 5. 重新构建并启动
echo "🔨 步骤 4/5: 重新构建镜像..."
docker compose build --no-cache
echo ""

echo "🚀 步骤 5/5: 启动服务..."
docker compose up -d
echo ""

# 6. 等待服务启动
echo "⏳ 等待服务启动（60秒）..."
for i in {60..1}; do
    echo -ne "   倒计时: $i 秒\r"
    sleep 1
done
echo ""
echo ""

# 7. 检查容器状态
echo "📊 检查容器状态:"
docker compose ps
echo ""

# 8. 测试访问
echo "🔍 测试本地访问:"
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:3000)
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ 本地访问正常 (HTTP $HTTP_CODE)"
else
    echo "   ⚠️  本地访问异常 (HTTP $HTTP_CODE)"
fi
echo ""

# 9. 显示日志
echo "📋 最新日志 (最后 20 行):"
docker compose logs --tail=20
echo ""

# 10. 完成
echo "================================================"
echo "  ✅ 更新完成！"
echo "================================================"
echo ""
echo "🌐 访问地址:"
echo "   - 本地: http://localhost:3000"
echo "   - 线上: https://dlmn.lol"
echo ""
echo "💡 常用命令:"
echo "   - 查看日志: docker compose logs -f"
echo "   - 重启服务: docker compose restart"
echo "   - 停止服务: docker compose down"
echo "   - 查看状态: docker compose ps"
echo ""
