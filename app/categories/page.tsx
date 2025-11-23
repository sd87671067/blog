import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export default async function CategoriesPage() {
  const posts = await getAllPosts()
  const categories = posts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="container mx-auto px-4 py-24">
      <h1 className="text-4xl font-bold mb-8">所有分类</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {Object.entries(categories).map(([category, count]) => (
          <Link
            key={category}
            href={`/categories/${encodeURIComponent(category)}`}
            className="p-6 rounded-lg border hover:border-blue-500 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">{category}</h2>
            <p className="text-gray-600">{count} 篇文章</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
