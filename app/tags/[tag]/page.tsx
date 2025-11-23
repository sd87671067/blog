import { getPostsByTag, getAllTags } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export async function generateStaticParams() {
  const tags = await getAllTags();
  return Object.keys(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: { params: { tag: string } }) {
  return {
    title: `标签: ${params.tag}`,
    description: `浏览标签为 ${params.tag} 的所有文章`,
  };
}

export default async function TagPage({ params }: { params: { tag: string } }) {
  const posts = await getPostsByTag(params.tag);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">
          标签: <span className="text-primary">#{params.tag}</span>
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
