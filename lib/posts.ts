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
  
  // 代码块 - 必须先处理
  html = html.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`
  })
  
  // 图片
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" loading="lazy" />')
  
  // 标题
  html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
  html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
  html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
  
  // 粗体和斜体
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.*?)\*/g, '<em>$1</em>')
  
  // 链接
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
  
  // 行内代码
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
  
  // 段落
  html = html.split('\n\n')
    .map(para => {
      para = para.trim()
      if (!para) return ''
      if (para.startsWith('<h') || para.startsWith('<pre') || para.startsWith('<img')) {
        return para
      }
      return `<p>${para}</p>`
    })
    .join('\n')

  return html
}

function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return text.replace(/[&<>"']/g, m => map[m])
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
