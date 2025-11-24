#!/bin/bash
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}[INFO]${NC} $1"; }
log_success() { echo -e "${GREEN}[SUCCESS]${NC} $1"; }
log_warning() { echo -e "${YELLOW}[WARNING]${NC} $1"; }
log_error() { echo -e "${RED}[ERROR]${NC} $1"; }

clear
echo -e "${BLUE}╔══════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   Next.js 博客一键部署脚本               ║${NC}"
echo -e "${BLUE}║   GitHub: sd87671067/blog                ║${NC}"
echo -e "${BLUE}╚══════════════════════════════════════════╝${NC}"
echo ""

if [ "$EUID" -ne 0 ]; then 
    log_error "请使用 root 用户运行此脚本"
    exit 1
fi

VPS_IP=$(curl -s ifconfig.me || curl -s icanhazip.com)
log_info "检测到 VPS IP: ${VPS_IP}"

echo ""
log_info "请选择部署模式:"
echo "  1) 仅部署博客 (使用 IP 访问)"
echo "  2) 部署博客 + 配置域名"
echo "  3) 部署博客 + 配置域名 + SSL 证书"
read -p "请输入选项 [1-3]: " DEPLOY_MODE

DOMAIN=""
USE_SSL=false

if [ "$DEPLOY_MODE" == "2" ] || [ "$DEPLOY_MODE" == "3" ]; then
    read -p "请输入域名 (例如: blog.example.com): " DOMAIN
    if [ -z "$DOMAIN" ]; then
        log_error "域名不能为空"
        exit 1
    fi
    log_success "已设置域名: ${DOMAIN}"
    
    if [ "$DEPLOY_MODE" == "3" ]; then
        USE_SSL=true
        log_success "将自动配置 SSL 证书"
    fi
fi

log_info "检查并安装依赖..."

if ! command -v git &> /dev/null; then
    log_info "安装 Git..."
    apt-get update -qq
    apt-get install -y git curl
else
    log_success "Git 已安装"
fi

if ! command -v docker &> /dev/null; then
    log_info "安装 Docker..."
    curl -fsSL https://get.docker.com | sh
    systemctl start docker
    systemctl enable docker
    log_success "Docker 安装完成"
else
    log_success "Docker 已安装"
fi

if ! command -v docker-compose &> /dev/null; then
    log_info "安装 Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    log_success "Docker Compose 安装完成"
else
    log_success "Docker Compose 已安装"
fi

INSTALL_DIR="/root/blog"

if [ -d "$INSTALL_DIR" ]; then
    log_warning "项目目录已存在"
    log_info "拉取最新代码..."
    cd $INSTALL_DIR
    git pull
else
    log_info "克隆项目..."
    cd /root
    git clone https://github.com/sd87671067/blog.git
    log_success "项目克隆完成"
fi

cd $INSTALL_DIR

if [ -n "$DOMAIN" ]; then
    log_info "配置域名: ${DOMAIN}"
    cp nginx.conf nginx.conf.bak
    sed -i "s/server_name _;/server_name ${DOMAIN} www.${DOMAIN};/" nginx.conf
    log_success "域名配置完成"
    
    echo ""
    log_warning "请确保 DNS 已配置:"
    echo "  类型: A | 名称: @ | 值: ${VPS_IP}"
    echo "  类型: A | 名称: www | 值: ${VPS_IP}"
    echo ""
fi

log_info "构建并启动服务..."
docker compose down 2>/dev/null || true
docker system prune -f
docker compose build --no-cache
docker compose up -d

log_info "等待服务启动..."
sleep 15

if docker compose ps | grep -q "Up"; then
    log_success "服务启动成功"
else
    log_error "服务启动失败"
    docker compose logs --tail 50
    exit 1
fi

if [ "$USE_SSL" = true ]; then
    log_info "配置 SSL 证书..."
    
    if ! command -v certbot &> /dev/null; then
        log_info "安装 Certbot..."
        apt-get update -qq
        apt-get install -y certbot
    fi
    
    docker compose stop nginx-proxy
    
    log_info "获取 Let's Encrypt 证书..."
    certbot certonly --standalone -d ${DOMAIN} -d www.${DOMAIN} \
        --non-interactive --agree-tos --email admin@${DOMAIN} \
        --rsa-key-size 4096
    
    if [ $? -eq 0 ]; then
        log_success "SSL 证书获取成功"
        
        cat > nginx.conf << 'NGINXEOF'
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;
    
    sendfile on;
    keepalive_timeout 65;
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
    
    proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;
    
    upstream nextjs {
        server nextjs-blog:3000;
    }
    
    server {
        listen 80;
        server_name DOMAIN_PLACEHOLDER www.DOMAIN_PLACEHOLDER;
        return 301 https://$host$request_uri;
    }
    
    server {
        listen 443 ssl http2;
        server_name DOMAIN_PLACEHOLDER www.DOMAIN_PLACEHOLDER;
        
        ssl_certificate /etc/letsencrypt/live/DOMAIN_PLACEHOLDER/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/DOMAIN_PLACEHOLDER/privkey.pem;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers HIGH:!aNULL:!MD5;
        
        location / {
            proxy_pass http://nextjs;
            proxy_http_version 1.1;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
        }
        
        location /_next/static/ {
            proxy_pass http://nextjs;
            proxy_cache my_cache;
            proxy_cache_valid 200 365d;
            add_header Cache-Control "public, max-age=31536000, immutable";
        }
    }
}
NGINXEOF
        
        sed -i "s/DOMAIN_PLACEHOLDER/${DOMAIN}/g" nginx.conf
        
        cat >> docker-compose.yml << 'DOCKEREOF'
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt:ro
DOCKEREOF
        
        docker compose down
        docker compose up -d
        
        log_success "SSL 配置完成"
        
        (crontab -l 2>/dev/null; echo "0 3 * * * certbot renew --quiet --post-hook 'docker compose -f ${INSTALL_DIR}/docker-compose.yml restart nginx-proxy'") | crontab -
        log_success "证书自动续期已配置"
    else
        log_error "SSL 证书获取失败"
        docker compose start nginx-proxy
    fi
fi

log_info "配置防火墙..."
if command -v ufw &> /dev/null; then
    ufw allow 80/tcp
    ufw allow 443/tcp
    [ -z "$DOMAIN" ] && ufw allow 3000/tcp
    log_success "防火墙配置完成"
fi

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║          🎉 部署完成！                   ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""

log_success "服务状态:"
docker compose ps

echo ""
log_success "访问信息:"
if [ -n "$DOMAIN" ]; then
    if [ "$USE_SSL" = true ]; then
        echo "  🌐 网站地址: https://${DOMAIN}"
        echo "  🌐 备用地址: https://www.${DOMAIN}"
    else
        echo "  🌐 网站地址: http://${DOMAIN}"
        echo "  🌐 备用地址: http://www.${DOMAIN}"
    fi
else
    echo "  🌐 网站地址: http://${VPS_IP}:3000"
fi

echo ""
log_info "常用命令:"
echo "  查看日志: cd ${INSTALL_DIR} && docker compose logs -f"
echo "  重启服务: cd ${INSTALL_DIR} && docker compose restart"
echo "  停止服务: cd ${INSTALL_DIR} && docker compose down"
echo "  更新博客: cd ${INSTALL_DIR} && git pull && docker compose up -d --build"
echo "  添加文章: cd ${INSTALL_DIR} && bash new-post.sh"

echo ""
log_success "部署成功！ 🚀"
