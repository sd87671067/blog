'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export default function PostPage() {
  const params = useParams()
  const [post, setPost] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`/api/posts/${params.slug}`)
      .then(res => res.json())
      .then(data => {
        setPost(data)
        setLoading(false)
        
        // 处理代码块
        setTimeout(() => {
          document.querySelectorAll('pre code').forEach((block) => {
            const pre = block.parentElement
            if (!pre) return
            
            const wrapper = document.createElement('div')
            wrapper.style.cssText = 'position:relative;margin:24px 0;border-radius:12px;background:var(--code-bg);border:1px solid var(--border-color);overflow:hidden;'
            
            const header = document.createElement('div')
            header.style.cssText = 'display:flex;align-items:center;justify-content:space-between;padding:12px 16px;border-bottom:1px solid var(--border-color);background:var(--code-header-bg);'
            
            const lang = document.createElement('span')
            lang.textContent = 'code'
            lang.style.cssText = 'font-size:13px;color:var(--text-secondary);font-family:monospace;'
            
            const copyBtn = document.createElement('button')
            copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> 复制'
            copyBtn.style.cssText = 'display:flex;align-items:center;gap:6px;padding:6px 12px;border-radius:8px;border:none;background:var(--button-bg);color:var(--text-primary);font-size:13px;font-weight:500;cursor:pointer;transition:all 0.2s;'
            
            copyBtn.onclick = async () => {
              await navigator.clipboard.writeText(block.textContent || '')
              copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> 已复制'
              copyBtn.style.background = 'rgba(34, 197, 94, 0.1)'
              copyBtn.style.color = '#22c55e'
              setTimeout(() => {
                copyBtn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> 复制'
                copyBtn.style.background = 'var(--button-bg)'
                copyBtn.style.color = 'var(--text-primary)'
              }, 2000)
            }
            
            header.appendChild(lang)
            header.appendChild(copyBtn)
            wrapper.appendChild(header)
            
            pre.style.cssText = 'margin:0;padding:16px;overflow:auto;font-size:14px;line-height:1.6;font-family:"SF Mono",Menlo,Monaco,"Courier New",monospace;'
            wrapper.appendChild(pre)
            
            pre.parentNode?.replaceChild(wrapper, pre)
          })
        }, 100)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [params.slug])

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-secondary)' }}>加载中...</div>
  }

  if (!post) {
    return <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--text-secondary)' }}>文章不存在</div>
  }

  return (
    <article style={{
      maxWidth: '800px',
      margin: '0 auto',
      padding: '48px 20px',
    }}>
      <header style={{ marginBottom: '48px' }}>
        <div style={{
          display: 'inline-block',
          padding: '6px 14px',
          borderRadius: '12px',
          backgroundColor: 'rgba(0, 122, 255, 0.1)',
          color: '#007AFF',
          fontSize: '13px',
          fontWeight: 600,
          marginBottom: '16px',
        }}>
          {post.category}
        </div>

        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          lineHeight: 1.2,
          marginBottom: '16px',
          color: 'var(--text-primary)',
          letterSpacing: '-0.5px',
        }}>
          {post.title}
        </h1>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '15px',
          color: 'var(--text-secondary)',
        }}>
          <time>{new Date(post.date).toLocaleDateString('zh-CN')}</time>
          {post.readingTime && (
            <>
              <span>·</span>
              <span>{post.readingTime}</span>
            </>
          )}
        </div>
      </header>

      <div
        style={{
          fontSize: '17px',
          lineHeight: '1.7',
          color: 'var(--text-primary)',
        }}
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />

      {post.tags && post.tags.length > 0 && (
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          marginTop: '48px',
          paddingTop: '48px',
          borderTop: '1px solid var(--border-color)',
        }}>
          {post.tags.map((tag: string) => (
            <a
              key={tag}
              href={`/tags/${encodeURIComponent(tag)}`}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                backgroundColor: 'var(--tag-bg)',
                color: 'var(--text-secondary)',
                fontSize: '14px',
                textDecoration: 'none',
                transition: 'all 0.2s',
              }}
            >
              #{tag}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
