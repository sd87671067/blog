'use client'

import { useEffect, useRef } from 'react'

export default function PostContent({ content }: { content: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const wrappers = ref.current.querySelectorAll('.code-block-wrapper')
    
    wrappers.forEach((wrapper) => {
      const lang = wrapper.getAttribute('data-lang') || 'bash'
      const pre = wrapper.querySelector('pre')
      const code = wrapper.querySelector('code')
      
      if (!pre || !code) return

      const codeText = code.textContent || ''

      // 清空 wrapper
      wrapper.innerHTML = ''

      // 创建完整结构
      const container = document.createElement('div')
      container.style.cssText = `
        margin: 24px 0;
        border-radius: 12px;
        background: #0d1117;
        border: 1px solid #30363d;
        overflow: hidden;
      `

      // 头部
      const header = document.createElement('div')
      header.style.cssText = `
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px 16px;
        background: #161b22;
        border-bottom: 1px solid #30363d;
      `

      const langSpan = document.createElement('span')
      langSpan.textContent = lang
      langSpan.style.cssText = `
        color: #8b949e;
        font-size: 13px;
        font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, monospace;
        font-weight: 500;
      `

      const copyBtn = document.createElement('button')
      copyBtn.innerHTML = `
        <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
          <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
          <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
        <span style="margin-left: 6px;">复制</span>
      `
      copyBtn.style.cssText = `
        display: flex;
        align-items: center;
        gap: 6px;
        background: #21262d;
        color: #c9d1d9;
        border: none;
        padding: 5px 12px;
        border-radius: 6px;
        cursor: pointer;
        font-size: 12px;
        font-weight: 500;
        transition: background 0.2s;
      `

      copyBtn.onmouseenter = () => {
        copyBtn.style.background = '#30363d'
      }
      copyBtn.onmouseleave = () => {
        copyBtn.style.background = '#21262d'
      }

      copyBtn.onclick = async () => {
        try {
          await navigator.clipboard.writeText(codeText)
          copyBtn.innerHTML = `
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
            </svg>
            <span style="margin-left: 6px;">已复制</span>
          `
          copyBtn.style.background = '#238636'
          copyBtn.style.color = '#fff'

          setTimeout(() => {
            copyBtn.innerHTML = `
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
                <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
              </svg>
              <span style="margin-left: 6px;">复制</span>
            `
            copyBtn.style.background = '#21262d'
            copyBtn.style.color = '#c9d1d9'
          }, 2000)
        } catch (err) {
          console.error('Failed to copy:', err)
        }
      }

      header.appendChild(langSpan)
      header.appendChild(copyBtn)

      // 代码区域
      const codeContainer = document.createElement('pre')
      codeContainer.style.cssText = `
        margin: 0;
        padding: 16px;
        background: #0d1117;
        overflow-x: auto;
        font-size: 14px;
        line-height: 1.5;
      `

      const codeElement = document.createElement('code')
      codeElement.textContent = codeText
      codeElement.style.cssText = `
        color: #c9d1d9;
        font-family: ui-monospace, SFMono-Regular, 'SF Mono', Menlo, Consolas, 'Liberation Mono', 'Courier New', monospace;
        font-size: 14px;
        line-height: 1.5;
      `

      codeContainer.appendChild(codeElement)
      container.appendChild(header)
      container.appendChild(codeContainer)
      wrapper.appendChild(container)
    })
  }, [content])

  return (
    <div
      ref={ref}
      style={{
        fontSize: '17px',
        lineHeight: '1.7',
        color: 'var(--text-primary)',
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
