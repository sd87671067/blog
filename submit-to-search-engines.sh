#!/bin/bash

echo "=========================================="
echo "  提交网站到搜索引擎"
echo "=========================================="
echo ""

SITE_URL="https://dlmn.lol"
SITEMAP_URL="$SITE_URL/sitemap.xml"

echo "📊 网站信息："
echo "   网站: $SITE_URL"
echo "   Sitemap: $SITEMAP_URL"
echo ""

echo "🔍 搜索引擎提交指南："
echo ""

echo "1️⃣  Google Search Console"
echo "   访问: https://search.google.com/search-console"
echo "   步骤:"
echo "   - 添加资源: $SITE_URL"
echo "   - 验证所有权（DNS 或 HTML 文件）"
echo "   - 提交 Sitemap: $SITEMAP_URL"
echo "   - 请求编入索引"
echo ""

echo "2️⃣  Bing Webmaster Tools"
echo "   访问: https://www.bing.com/webmasters"
echo "   步骤:"
echo "   - 添加网站: $SITE_URL"
echo "   - 验证所有权"
echo "   - 提交 Sitemap: $SITEMAP_URL"
echo ""

echo "3️⃣  百度站长平台"
echo "   访问: https://ziyuan.baidu.com/site/index"
echo "   步骤:"
echo "   - 添加网站: $SITE_URL"
echo "   - 验证所有权"
echo "   - 提交 Sitemap"
echo "   - 主动推送 URL"
echo ""

echo "4️⃣  自动 Ping Google"
curl -s "https://www.google.com/ping?sitemap=$SITEMAP_URL" > /dev/null
if [ $? -eq 0 ]; then
    echo "   ✅ 已 Ping Google"
else
    echo "   ❌ Ping Google 失败"
fi

echo ""
echo "5️⃣  自动 Ping Bing"
curl -s "https://www.bing.com/ping?sitemap=$SITEMAP_URL" > /dev/null
if [ $? -eq 0 ]; then
    echo "   ✅ 已 Ping Bing"
else
    echo "   ❌ Ping Bing 失败"
fi

echo ""
echo "📝 后续步骤："
echo "   1. 访问 Google Search Console 完成验证"
echo "   2. 访问 Bing Webmaster Tools 完成验证"
echo "   3. 定期检查索引状态"
echo "   4. 查看搜索表现数据"
echo ""

echo "🔗 有用的链接："
echo "   - 检查索引: site:dlmn.lol"
echo "   - Sitemap: $SITEMAP_URL"
echo "   - Robots: $SITE_URL/robots.txt"
echo ""

echo "✅ 完成！"
