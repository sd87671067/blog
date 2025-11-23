import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPostBySlug, getAllPostSlugs, getAdjacentPosts } from '@/lib/posts';
import { formatDate } from '@/lib/utils';
import MDXContent from '@/components/MDXContent';
import TableOfContents from '@/components/TableOfContents';

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: '文章未找到',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { prev, next } = await getAdjacentPosts(slug);

  return (
    <div className="container mx-auto px-4 py-12">
      <article className="max-w-4xl mx-auto">
        {/* Article Header */}
        <header className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-6">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
            <span>·</span>
            <Link
              href={`/categories/${post.category}`}
              className="text-primary hover:underline"
            >
              {post.category}
            </Link>
          </div>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="text-sm px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Article Content with TOC */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr,250px] gap-8">
          <div className="min-w-0">
            <MDXContent content={post.htmlContent} />
          </div>
          <aside className="hidden lg:block">
            <TableOfContents toc={post.toc} />
          </aside>
        </div>

        {/* Navigation */}
        <nav className="mt-12 pt-8 border-t">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev && (
              <Link
                href={`/posts/${prev.slug}`}
                className="p-4 rounded-lg border hover:bg-accent transition-colors"
              >
                <div className="text-sm text-muted-foreground mb-1">← 上一篇</div>
                <div className="font-medium">{prev.title}</div>
              </Link>
            )}
            {next && (
              <Link
                href={`/posts/${next.slug}`}
                className="p-4 rounded-lg border hover:bg-accent transition-colors md:text-right"
              >
                <div className="text-sm text-muted-foreground mb-1">下一篇 →</div>
                <div className="font-medium">{next.title}</div>
              </Link>
            )}
          </div>
        </nav>
      </article>
    </div>
  );
}
