import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

export default async function PostsPage() {
  const posts = await getAllPosts()

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">所有文章</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  )
}
