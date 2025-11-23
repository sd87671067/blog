'use client'

import { useEffect } from 'react'

export default function PostContent({ content }: { content: string }) {
  useEffect(() => {
    // 为所有代码块添加复制按钮
    const codeBlocks = document.querySelectorAll('pre')
    
    codeBlocks.forEach((pre) => {
      // 避免重复添加
      if (pre.querySelector('.copy-button')) return
      
      const codeElement = pre.querySelector('code')
      if (!codeElement) return
      
      // 获取语言
      const className = codeElement.className
      const language = className ? className.replace('language-', '') : 'text'
      
      // 创建包装器
      const wrapper = document.createElement('div')
      wrapper.style.cssText = 'position:relative;margin:24px 0;border-radius:12px;background:var(--code-bg);border:1px solid var(--border-color);overflow:hidden;'
      
      // 创建头部
      const header = document.createElement('div')
      header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border-color);background:var(--code-header-bg);'
      
      const langSpan = document.createElement('span')
      langSpan.textContent = language
      langSpan.style.cssText = 'font-size:13px;color:var(--text-secondary);font-family:monospace;'
      
      const copyBtn = document.createElement('button')
      copyBtn.className = 'copy-button'
      copyBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        <span>复制</span>
      `
      copyBtn.style.cssText = 'display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;border:none;background:var(--button-bg);color:var(--text-primary);font-size:13px;font-weight:500;cursor:pointer;transition:all 0.2s;'
      
      copyBtn.onclick = async () => {
        const code = codeElement.textContent || ''
        await navigator.clipboard.writeText(code)
        copyBtn.innerHTML = `
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span>已复制</span>
        `
        copyBtn.style.background = 'rgba(34, 197, 94, 0.1)'
        copyBtn.style.color = '#22c55e'
        
        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            <span>复制</span>
          `
          copyBtn.style.background = 'var(--button-bg)'
          copyBtn.style.color = 'var(--text-primary)'
        }, 2000)
      }
      
      header.appendChild(langSpan)
      header.appendChild(copyBtn)
      
      // 设置 pre 样式
      pre.style.cssText = 'margin:0;padding:16px;overflow-x:auto;font-size:14px;line-height:1.6;font-family:"SF Mono",Menlo,Monaco,"Courier New",monospace;background:var(--code-bg);'
      
      // 插入到文档
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(header)
      wrapper.appendChild(pre)
    })
  }, [content])

  return (
    <div
      style={{
        fontSize: '17px',
        lineHeight: '1.7',
        color: 'var(--text-primary)',
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
