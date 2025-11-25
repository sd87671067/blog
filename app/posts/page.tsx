import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import ServerPagination from '@/components/ServerPagination'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata: Metadata = {
  title: '全部文章 - 外汇交易教程与分析',
  description: '浏览所有外汇交易文章，包括K线分析、技术指标、交易策略、原油黄金信号等实战内容。',
  alternates: {
    canonical: 'https://dlmn.lol/posts',
  },
}

const POSTS_PER_PAGE = 12

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string }
}) {
  const params = searchParams instanceof Promise ? await searchParams : searchParams
  
  const allPostsData = await getAllPosts()
  const currentPage = Number(params.page) || 1
  const totalPages = Math.ceil(allPostsData.length / POSTS_PER_PAGE)
  const validPage = Math.max(1, Math.min(currentPage, totalPages))
  
  const startIndex = (validPage - 1) * POSTS_PER_PAGE
  const endIndex = startIndex + POSTS_PER_PAGE
  const currentPosts = allPostsData.slice(startIndex, endIndex)

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '16px 16px 8px',
    }}>
      <h1 className="sr-only">全部外汇交易文章</h1>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '10px',
        maxWidth: '800px',
        margin: '0 auto',
        minHeight: '800px',
      }}>
        {currentPosts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      <div style={{
        maxWidth: '800px',
        margin: '12px auto 0',
        width: '100%',
      }}>
        {totalPages > 1 && (
          <ServerPagination
            currentPage={validPage}
            totalPages={totalPages}
          />
        )}

        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: '#999',
          marginTop: '8px',
        }}>
          第 {validPage} 页 / 共 {totalPages} 页
        </div>
      </div>
    </div>
  )
}
