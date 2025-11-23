import Link from 'next/link';
import { PostMetadata } from '@/lib/posts';
import { formatDate } from '@/lib/utils';

interface PostCardProps {
  post: PostMetadata;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <article className="group rounded-lg border bg-card p-6 hover:shadow-lg transition-shadow">
      <Link href={`/posts/${post.slug}`}>
        <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h2>
      </Link>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span>·</span>
        <span>{post.readingTime}</span>
        <span>·</span>
        <span className="text-primary">{post.category}</span>
      </div>
      {post.description && (
        <p className="text-muted-foreground mb-4">{post.description}</p>
      )}
      {post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="text-xs px-3 py-1 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
