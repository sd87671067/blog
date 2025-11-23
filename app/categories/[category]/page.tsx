import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const categories = [...new Set(posts.map(post => post.category))]
  
  return categories.map((category) => ({
    category: encodeURIComponent(category),
  }))
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params
  const decodedCategory = decodeURIComponent(category)
  const posts = await getAllPosts()
  const filteredPosts = posts.filter((post) => post.category === decodedCategory)

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">分类: {decodedCategory}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  )
}
