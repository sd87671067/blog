import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import ServerPagination from '@/components/ServerPagination'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: '全部文章',
  description: '浏览所有外汇交易文章和分析',
}

const POSTS_PER_PAGE = 12 // 改为每页12篇

export default async function PostsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }> | { page?: string }
}) {
  // 兼容 Next.js 不同版本
  const params = searchParams instanceof Promise ? await searchParams : searchParams
  
  const allPostsData = await getAllPosts()
  const currentPage = Number(params.page) || 1
  const totalPages = Math.ceil(allPostsData.length / POSTS_PER_PAGE)
  
  // 确保页码在有效范围内
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
      {/* 双列网格布局 */}
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

      {/* 翻页区域 */}
      <div style={{
        maxWidth: '800px',
        margin: '12px auto 0',
        width: '100%',
      }}>
        {/* 翻页组件 */}
        {totalPages > 1 && (
          <ServerPagination
            currentPage={validPage}
            totalPages={totalPages}
          />
        )}

        {/* 页面信息 */}
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
