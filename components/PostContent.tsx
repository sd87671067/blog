'use client'

import { useEffect, useRef } from 'react'

export default function PostContent({ content }: { content: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // 等待 DOM 渲染完成
    const timer = setTimeout(() => {
      const allPres = containerRef.current?.querySelectorAll('pre')
      if (!allPres) return

      allPres.forEach((pre) => {
        // 如果已经处理过，跳过
        if (pre.dataset.processed === 'true') return
        pre.dataset.processed = 'true'

        const code = pre.querySelector('code')
        if (!code) return

        const codeText = code.textContent || ''
        const langClass = code.className || ''
        const lang = langClass.replace('language-', '') || 'text'

        // 创建包装器
        const wrapper = document.createElement('div')
        wrapper.style.cssText = 'position:relative;margin:24px 0;border-radius:12px;background:var(--code-bg);border:1px solid var(--border-color);overflow:hidden;'

        // 创建头部
        const header = document.createElement('div')
        header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border-color);background:var(--code-header-bg);'

        // 语言标签
        const langSpan = document.createElement('span')
        langSpan.textContent = lang
        langSpan.style.cssText = 'font-size:13px;color:var(--text-secondary);font-family:monospace;font-weight:500;'

        // 复制按钮
        const btn = document.createElement('button')
        btn.type = 'button'
        btn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          <span style="margin-left:6px;vertical-align:middle;">复制</span>
        `
        btn.style.cssText = 'display:inline-flex;align-items:center;padding:6px 12px;border-radius:8px;border:none;background:var(--button-bg);color:var(--text-primary);font-size:13px;font-weight:500;cursor:pointer;transition:all 0.2s;'

        btn.addEventListener('mouseenter', () => {
          btn.style.background = 'var(--button-hover-bg)'
        })
        btn.addEventListener('mouseleave', () => {
          if (!btn.dataset.copied) {
            btn.style.background = 'var(--button-bg)'
          }
        })

        btn.addEventListener('click', async () => {
          try {
            await navigator.clipboard.writeText(codeText)
            btn.dataset.copied = 'true'
            btn.innerHTML = `
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              <span style="margin-left:6px;vertical-align:middle;">已复制</span>
            `
            btn.style.background = 'rgba(34, 197, 94, 0.1)'
            btn.style.color = '#22c55e'

            setTimeout(() => {
              delete btn.dataset.copied
              btn.innerHTML = `
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="vertical-align:middle;">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                </svg>
                <span style="margin-left:6px;vertical-align:middle;">复制</span>
              `
              btn.style.background = 'var(--button-bg)'
              btn.style.color = 'var(--text-primary)'
            }, 2000)
          } catch (err) {
            console.error('Failed to copy:', err)
          }
        })

        header.appendChild(langSpan)
        header.appendChild(btn)

        // 修改 pre 样式
        pre.style.cssText = 'margin:0;padding:16px;overflow-x:auto;background:var(--code-bg);'
        code.style.cssText = 'font-family:"SF Mono",Menlo,Monaco,"Courier New",monospace;font-size:14px;line-height:1.6;color:var(--text-primary);'

        // 插入到 DOM
        const parent = pre.parentElement
        if (parent) {
          parent.insertBefore(wrapper, pre)
          wrapper.appendChild(header)
          wrapper.appendChild(pre)
        }
      })
    }, 50)

    return () => clearTimeout(timer)
  }, [content])

  return (
    <div
      ref={containerRef}
      style={{
        fontSize: '17px',
        lineHeight: '1.7',
        color: 'var(--text-primary)',
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
