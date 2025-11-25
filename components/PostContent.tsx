'use client'

import { useEffect, useRef } from 'react'

export default function PostContent({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const wrappers = ref.current.querySelectorAll('.code-block-wrapper')
    
    wrappers.forEach((wrapper) => {
      // 如果已经处理过，跳过
      if (wrapper.querySelector('.github-code-block')) return
      
      const pre = wrapper.querySelector('pre')
      const code = wrapper.querySelector('code')
      
      if (!pre || !code) return

      const codeText = code.textContent || ''

      // 清空 wrapper
      wrapper.innerHTML = ''

      // 创建单层代码块容器
      const container = document.createElement('div')
      container.className = 'github-code-block'
      container.style.cssText = `
        position: relative;
        margin: 16px 0;
        border-radius: 6px;
        background: var(--code-bg);
        border: 1px solid var(--code-border);
        overflow: hidden;
      `

      // 复制按钮 - 右上角悬浮
      const copyBtn = document.createElement('button')
      copyBtn.className = 'copy-btn'
      copyBtn.innerHTML = `
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
          <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
        </svg>
      `
      copyBtn.style.cssText = `
        position: absolute;
        top: 8px;
        right: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--code-btn-bg);
        color: var(--code-icon);
        border: none;
        padding: 6px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.15s ease;
        z-index: 10;
      `

      copyBtn.onmouseenter = () => {
        copyBtn.style.background = 'var(--code-btn-hover)'
        copyBtn.style.color = 'var(--code-text)'
      }
      copyBtn.onmouseleave = () => {
        copyBtn.style.background = 'var(--code-btn-bg)'
        copyBtn.style.color = 'var(--code-icon)'
      }

      copyBtn.onclick = async () => {
        try {
          await navigator.clipboard.writeText(codeText)
          copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.78 4.22a.75.75 0 0 1 0 1.06l-7.25 7.25a.75.75 0 0 1-1.06 0L2.22 9.28a.751.751 0 0 1 .018-1.042.751.751 0 0 1 1.042-.018L6 10.94l6.72-6.72a.75.75 0 0 1 1.06 0Z"></path>
            </svg>
          `
          copyBtn.style.color = 'var(--code-success)'

          setTimeout(() => {
            copyBtn.innerHTML = `
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                <path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 0 1 0 1.5h-1.5a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-1.5a.75.75 0 0 1 1.5 0v1.5A1.75 1.75 0 0 1 9.25 16h-7.5A1.75 1.75 0 0 1 0 14.25Z"></path>
                <path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0 1 14.25 11h-7.5A1.75 1.75 0 0 1 5 9.25Zm1.75-.25a.25.25 0 0 0-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 0 0 .25-.25v-7.5a.25.25 0 0 0-.25-.25Z"></path>
              </svg>
            `
            copyBtn.style.color = 'var(--code-icon)'
          }, 2000)
        } catch (err) {
          console.error('Failed to copy:', err)
        }
      }

      // 代码区域 - 单层
      const codeContainer = document.createElement('pre')
      codeContainer.style.cssText = `
        margin: 0;
        padding: 16px;
        padding-right: 50px;
        background: transparent;
        overflow-x: auto;
        font-size: 13px;
        line-height: 1.45;
      `

      const codeElement = document.createElement('code')
      codeElement.textContent = codeText
      codeElement.style.cssText = `
        color: var(--code-text);
        font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', monospace;
        font-size: 13px;
        line-height: 1.45;
        tab-size: 2;
        background: transparent;
        padding: 0;
        border: none;
      `

      codeContainer.appendChild(codeElement)
      container.appendChild(copyBtn)
      container.appendChild(codeContainer)
      wrapper.appendChild(container)
    })
  }, [content])

  return (
    <div
      ref={ref}
      style={{
        fontSize: '17px',
        lineHeight: '1.6',
        color: 'var(--text-primary)',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Helvetica Neue', sans-serif",
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
