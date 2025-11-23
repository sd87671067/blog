import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';

export const metadata = {
  title: '所有文章',
  description: '浏览所有博客文章',
};

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">所有文章</h1>
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
