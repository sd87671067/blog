import { getPostsByCategory, getAllCategories } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export async function generateStaticParams() {
  const categories = await getAllCategories();
  return Object.keys(categories).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: { category: string } }) {
  return {
    title: `分类: ${params.category}`,
    description: `浏览分类为 ${params.category} 的所有文章`,
  };
}

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const posts = await getPostsByCategory(params.category);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          分类: <span className="text-primary">{params.category}</span>
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
