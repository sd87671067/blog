'use client'

import { useEffect, useState } from 'react'
import PostCard from '@/components/PostCard'
import Pagination from '@/components/Pagination'

interface Post {
  slug: string
  title: string
  date: string
  category: string
  tags: string[]
  description?: string
  readingTime?: string
}

const POSTS_PER_PAGE = 3

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/posts')
      .then(res => res.json())
      .then(data => {
        setPosts(data)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE)
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = posts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-24">
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
          加载中...
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div style={{ marginBottom: '48px' }}>
        <h1 style={{
          fontSize: '36px',
          fontWeight: 700,
          marginBottom: '12px',
          color: 'var(--text-primary)',
        }}>
          所有文章
        </h1>
        <p style={{
          fontSize: '17px',
          color: 'var(--text-secondary)',
        }}>
          共 {posts.length} 篇文章，第 {currentPage} / {totalPages} 页
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentPosts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}
