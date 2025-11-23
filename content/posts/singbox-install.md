---
title: "Sing-box内核，一键配置reality，anytls,shadowtlsv3协议"
date: "2025-03-07"
excerpt: Sing-box内核，一键配置reality，anytls,shadowtlsv3协议
category: "自建梯子"
tags:
- reality
---

# Debian/Ubuntu Singbox傻瓜一键安装命令
```
bash <(curl -fsSL https://raw.githubusercontent.com/sd87671067/singbox-install/main/install.sh)
```
# singbox 重启

```
systemctl restart sing-box
```

## singbox 实时日志

```
journalctl -u sing-box --output cat -f
```

## singbox状态

```
systemctl status sing-box.service
```


# SSH连接上VPS,粘贴傻瓜一键配置命令。回车，回车，回车。最后复制生成出来的链接导入到shadowrocket或者v2rayn客户端里面。
