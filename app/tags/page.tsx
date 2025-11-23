import Link from 'next/link';
import { getAllTags } from '@/lib/posts';

export const metadata = {
  title: '标签',
  description: '浏览所有标签',
};

export default async function TagsPage() {
  const tags = await getAllTags();
  const sortedTags = Object.entries(tags).sort((a, b) => b[1] - a[1]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">标签</h1>
        <div className="flex flex-wrap gap-4">
          {sortedTags.map(([tag, count]) => (
            <Link
              key={tag}
              href={`/tags/${tag}`}
              className="group"
            >
              <div className="px-6 py-3 rounded-lg border bg-card hover:shadow-lg transition-all">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium group-hover:text-primary transition-colors">
                    #{tag}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    ({count})
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
