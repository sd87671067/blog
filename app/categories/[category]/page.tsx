import { getPostsByCategory, getAllCategories } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return Object.keys(categories).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  return {
    title: `分类: ${category}`,
    description: `浏览分类为 ${category} 的所有文章`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          分类: <span className="text-primary">{category}</span>
        </h1>
        <p className="text-muted-foreground">共 {posts.length} 篇文章</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
