#!/bin/bash

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# 日志函数
log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 错误处理
set -e
trap 'log_error "部署失败！"; exit 1' ERR

log_info "开始部署博客系统..."

# 1. 检查 Docker 是否安装
if ! command -v docker &> /dev/null; then
    log_error "Docker 未安装，请先安装 Docker"
    exit 1
fi

if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    log_error "Docker Compose 未安装，请先安装 Docker Compose"
    exit 1
fi

log_info "Docker 环境检查通过"

# 2. 拉取最新代码
if [ -d .git ]; then
    log_info "拉取最新代码..."
    git pull origin main || git pull origin master || log_warn "无法拉取代码，继续使用当前版本"
else
    log_warn "非 Git 仓库，跳过代码更新"
fi

# 3. 备份旧容器（如果存在）
if docker ps -a | grep -q nextjs-blog; then
    log_info "备份并停止旧容器..."
    docker-compose down || docker compose down
fi

# 4. 构建新镜像
log_info "构建 Docker 镜像..."
if command -v docker-compose &> /dev/null; then
    docker-compose build --no-cache
else
    docker compose build --no-cache
fi

# 5. 启动服务
log_info "启动服务..."
if command -v docker-compose &> /dev/null; then
    docker-compose up -d
else
    docker compose up -d
fi

# 6. 等待服务启动
log_info "等待服务启动..."
sleep 10

# 7. 健康检查
log_info "执行健康检查..."
max_attempts=30
attempt=0

while [ $attempt -lt $max_attempts ]; do
    if docker ps | grep -q nextjs-blog && docker exec nextjs-blog wget --quiet --tries=1 --spider http://localhost:3000 2>/dev/null; then
        log_info "服务健康检查通过！"
        break
    fi
    
    attempt=$((attempt + 1))
    if [ $attempt -eq $max_attempts ]; then
        log_error "服务启动失败或健康检查超时"
        log_info "查看容器日志："
        docker logs nextjs-blog
        exit 1
    fi
    
    echo -n "."
    sleep 2
done

echo ""

# 8. 清理旧镜像
log_info "清理未使用的 Docker 镜像..."
docker image prune -f || log_warn "清理镜像失败，请手动清理"

# 9. 显示容器状态
log_info "容器状态："
if command -v docker-compose &> /dev/null; then
    docker-compose ps
else
    docker compose ps
fi

# 10. 显示访问信息
echo ""
log_info "================================================"
log_info "部署成功！🎉"
log_info "================================================"
log_info "博客地址: http://localhost:3000"
log_info "Nginx 代理: http://localhost:80"
log_info ""
log_info "常用命令："
log_info "  查看日志: docker logs -f nextjs-blog"
log_info "  停止服务: docker-compose down 或 docker compose down"
log_info "  重启服务: docker-compose restart 或 docker compose restart"
log_info "  查看状态: docker-compose ps 或 docker compose ps"
log_info "================================================"

exit 0
