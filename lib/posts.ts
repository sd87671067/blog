import fs from 'fs/promises'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'content/posts')

export interface PostMetadata {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  description?: string
  cover?: string
  readingTime?: string
}

export interface Post extends PostMetadata {
  content: string
  contentHtml?: string
}

function estimateReadingTime(content: string): string {
  const wordsPerMinute = 200
  const wordCount = content.split(/\s+/).length
  const minutes = Math.ceil(wordCount / wordsPerMinute)
  return `${minutes} min read`
}

function markdownToHtml(markdown: string): string {
  let html = markdown

  // 代码块 - 用特殊标记包裹
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
    const language = lang || 'bash'
    const safeCode = code
      .trim()
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    
    return `<div class="code-block-wrapper" data-lang="${language}"><pre><code>${safeCode}</code></pre></div>`
  })

  // 图片
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;height:auto;border-radius:12px;margin:24px 0;" />')

  // 标题
  html = html.replace(/^### (.*$)/gim, '<h3 style="font-size:24px;font-weight:600;margin:32px 0 16px;color:var(--text-primary);">$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2 style="font-size:28px;font-weight:600;margin:40px 0 20px;color:var(--text-primary);">$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1 style="font-size:32px;font-weight:700;margin:48px 0 24px;color:var(--text-primary);">$1</h1>')

  // 粗体和斜体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong style="font-weight:600;">$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')

  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" style="color:#007AFF;text-decoration:none;">$1</a>')

  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code style="background:#f6f8fa;padding:2px 6px;border-radius:4px;font-size:0.9em;font-family:monospace;">$1</code>')

  // 段落
  html = html.split('\n\n').map(para => {
    para = para.trim()
    if (!para) return ''
    if (para.startsWith('<')) return para
    return `<p style="margin-bottom:16px;line-height:1.7;">${para}</p>`
  }).join('\n')

  return html
}

export async function getAllPosts(): Promise<PostMetadata[]> {
  try {
    const fileNames = await fs.readdir(postsDirectory)
    const allPostsData = await Promise.all(
      fileNames
        .filter((fileName) => fileName.endsWith('.md'))
        .map(async (fileName) => {
          const slug = fileName.replace(/\.md$/, '')
          const fullPath = path.join(postsDirectory, fileName)
          const fileContents = await fs.readFile(fullPath, 'utf8')
          const { data, content } = matter(fileContents)

          return {
            slug,
            title: data.title,
            date: data.date,
            category: data.category || 'Uncategorized',
            tags: data.tags || [],
            description: data.description,
            cover: data.cover,
            readingTime: estimateReadingTime(content),
          } as PostMetadata
        })
    )

    return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))
  } catch (error) {
    console.error('Error reading posts:', error)
    return []
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = await fs.readFile(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title,
      date: data.date,
      category: data.category || 'Uncategorized',
      tags: data.tags || [],
      description: data.description,
      cover: data.cover,
      content,
      contentHtml: markdownToHtml(content),
      readingTime: estimateReadingTime(content),
    }
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error)
    return null
  }
}

export async function searchPosts(query: string): Promise<PostMetadata[]> {
  const allPosts = await getAllPosts()
  const lowerQuery = query.toLowerCase()
  
  return allPosts.filter(post => 
    post.title.toLowerCase().includes(lowerQuery) ||
    post.description?.toLowerCase().includes(lowerQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    post.category.toLowerCase().includes(lowerQuery)
  )
}

export async function getAllTags(): Promise<{ [key: string]: number }> {
  const posts = await getAllPosts()
  const tags: { [key: string]: number } = {}

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags[tag] = (tags[tag] || 0) + 1
    })
  })

  return tags
}

export async function getAllCategories(): Promise<{ [key: string]: number }> {
  const posts = await getAllPosts()
  const categories: { [key: string]: number } = {}

  posts.forEach((post) => {
    categories[post.category] = (categories[post.category] || 0) + 1
  })

  return categories
}
