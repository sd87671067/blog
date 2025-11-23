import { getAllPosts } from '@/lib/posts';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 6);

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          欢迎来到我的博客
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          分享技术心得、开发经验和学习笔记
        </p>
        <div className="flex justify-center">
          <SearchBar />
        </div>
      </section>

      {/* Featured Posts */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">最新文章</h2>
          <a
            href="/posts"
            className="text-primary hover:underline"
          >
            查看全部 →
          </a>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-16 py-12 border-t">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {posts.length}
            </div>
            <div className="text-muted-foreground">篇文章</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {new Set(posts.flatMap(p => p.tags)).size}
            </div>
            <div className="text-muted-foreground">个标签</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-primary mb-2">
              {new Set(posts.map(p => p.category)).size}
            </div>
            <div className="text-muted-foreground">个分类</div>
          </div>
        </div>
      </section>
    </div>
  );
}
