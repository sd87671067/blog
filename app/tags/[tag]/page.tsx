import { getAllPosts } from '@/lib/posts'
import PostCard from '@/components/PostCard'

interface PageProps {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const posts = await getAllPosts()
  const allTags = posts.flatMap(post => post.tags)
  const tags = [...new Set(allTags)]
  
  return tags.map((tag) => ({
    tag: encodeURIComponent(tag),
  }))
}

export default async function TagPage({ params }: PageProps) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = await getAllPosts()
  const filteredPosts = posts.filter((post) => post.tags.includes(decodedTag))

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">标签: {decodedTag}</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredPosts.map((post, index) => (
          <PostCard key={post.slug} post={post} index={index} />
        ))}
      </div>
    </div>
  )
}
