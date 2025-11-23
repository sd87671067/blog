import { getAllPosts } from '@/lib/posts'
import HomeClient from '@/components/HomeClient'

export default async function Home() {
  const allPosts = await getAllPosts()
  const featuredPosts = allPosts.slice(0, 6)

  return <HomeClient posts={allPosts} featuredPosts={featuredPosts} />
}
