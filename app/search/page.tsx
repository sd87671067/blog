import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ''
  const allPosts = await getAllPosts()
  
  const filteredPosts = query
    ? allPosts.filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.description?.toLowerCase().includes(query.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
        post.category.toLowerCase().includes(query.toLowerCase())
      )
    : []

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-4">搜索结果</h1>
      {query && (
        <p className="text-lg mb-8" style={{ color: 'var(--text-secondary)' }}>
          找到 {filteredPosts.length} 篇关于 "{query}" 的文章
        </p>
      )}
      
      {filteredPosts.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post, index) => (
            <PostCard key={post.slug} post={post} index={index} />
          ))}
        </div>
      ) : query ? (
        <p style={{ color: 'var(--text-secondary)' }}>没有找到相关文章</p>
      ) : (
        <p style={{ color: 'var(--text-secondary)' }}>请输入搜索关键词</p>
      )}
    </div>
  )
}
