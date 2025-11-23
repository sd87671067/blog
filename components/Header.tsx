'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">📝 我的博客</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/') && pathname === '/'
                  ? 'text-foreground'
                  : 'text-foreground/60'
              }`}
            >
              首页
            </Link>
            <Link
              href="/posts"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/posts')
                  ? 'text-foreground'
                  : 'text-foreground/60'
              }`}
            >
              文章
            </Link>
            <Link
              href="/tags"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive('/tags')
                  ? 'text-foreground'
                  : 'text-foreground/60'
              }`}
            >
              标签
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
