import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default async function PostsPage() {
  const posts = await getAllPosts()

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
          共 {posts.length} 篇文章
        </p>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  )
}
