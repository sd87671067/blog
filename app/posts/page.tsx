import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'
import ServerPagination from '@/components/ServerPagination'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const metadata = {
  title: '全部文章',
  description: '浏览所有外汇交易文章和分析',
}

const POSTS_PER_PAGE = 12

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { page?: string }
}) {
  const allPostsData = await getAllPosts()
  const currentPage = Number(searchParams.page) || 1
  const totalPages = Math.ceil(allPostsData.length / POSTS_PER_PAGE)
  
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE
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
        gap: '12px',
        maxWidth: '800px',
        margin: '0 auto 12px',
      }}>
        {currentPosts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>

      {/* 翻页组件 */}
      <ServerPagination
        currentPage={currentPage}
        totalPages={totalPages}
      />

      {/* 页面信息 */}
      <div style={{
        textAlign: 'center',
        marginTop: '6px',
        fontSize: '11px',
        color: '#999',
      }}>
        第 {currentPage} 页，共 {totalPages} 页，{allPostsData.length} 篇文章
      </div>
    </div>
  )
}
