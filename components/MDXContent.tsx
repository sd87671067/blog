'use client'

import { useEffect } from 'react'

export default function MDXContent({ content }: { content: string }) {
  useEffect(() => {
    // 为所有代码块添加复制按钮
    const codeBlocks = document.querySelectorAll('pre')
    
    codeBlocks.forEach((block) => {
      const wrapper = document.createElement('div')
      wrapper.style.position = 'relative'
      wrapper.style.marginBottom = '24px'
      
      const button = document.createElement('button')
      button.innerHTML = '📋 Copy'
      button.style.cssText = `
        position: absolute;
        top: 12px;
        right: 12px;
        padding: 6px 12px;
        background: rgba(0, 122, 255, 0.9);
        color: white;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: all 0.2s;
        z-index: 10;
      `
      
      button.onmouseenter = () => {
        button.style.background = 'rgba(0, 122, 255, 1)'
        button.style.transform = 'scale(1.05)'
      }
      button.onmouseleave = () => {
        button.style.background = 'rgba(0, 122, 255, 0.9)'
        button.style.transform = 'scale(1)'
      }
      
      button.onclick = async () => {
        const code = block.textContent || ''
        await navigator.clipboard.writeText(code)
        button.innerHTML = '✅ Copied!'
        setTimeout(() => {
          button.innerHTML = '📋 Copy'
        }, 2000)
      }
      
      block.parentNode?.insertBefore(wrapper, block)
      wrapper.appendChild(block)
      wrapper.appendChild(button)
    })
  }, [content])

  return (
    <div
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '48px 20px',
        fontSize: '17px',
        lineHeight: '1.7',
        color: 'rgba(0, 0, 0, 0.88)',
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}
