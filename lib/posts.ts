import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { markdownToHtml, extractToc, TocItem } from './markdown';

const postsDirectory = path.join(process.cwd(), 'content/posts');

/**
 * 文章元数据接口
 */
export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  category: string;
  description: string;
  cover?: string;
  readingTime: string;
}

/**
 * 完整文章接口
 */
export interface Post extends PostMetadata {
  content: string;
  htmlContent: string;
  toc: TocItem[];
}

/**
 * 确保 posts 目录存在
 */
function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
  }
}

/**
 * 获取所有文章的 slug
 */
export function getAllPostSlugs(): string[] {
  ensurePostsDirectory();
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => fileName.replace(/\.md$/, ''));
}

/**
 * 根据 slug 获取文章数据
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensurePostsDirectory();
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const stats = readingTime(content);
  const htmlContent = await markdownToHtml(content);
  const toc = extractToc(content);

  return {
    slug,
    title: data.title || 'Untitled',
    date: data.date || new Date().toISOString().split('T')[0],
    tags: data.tags || [],
    category: data.category || 'Uncategorized',
    description: data.description || '',
    cover: data.cover,
    readingTime: stats.text,
    content,
    htmlContent,
    toc,
  };
}

/**
 * 获取所有文章（按日期排序）
 */
export async function getAllPosts(): Promise<PostMetadata[]> {
  ensurePostsDirectory();
  const slugs = getAllPostSlugs();
  const posts: PostMetadata[] = [];

  for (const slug of slugs) {
    const post = await getPostBySlug(slug);
    if (post) {
      const { content, htmlContent, toc, ...metadata } = post;
      posts.push(metadata);
    }
  }

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

/**
 * 获取所有标签及其文章数量
 */
export async function getAllTags(): Promise<{ [key: string]: number }> {
  const posts = await getAllPosts();
  const tags: { [key: string]: number } = {};

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      tags[tag] = (tags[tag] || 0) + 1;
    });
  });

  return tags;
}

/**
 * 获取所有分类及其文章数量
 */
export async function getAllCategories(): Promise<{ [key: string]: number }> {
  const posts = await getAllPosts();
  const categories: { [key: string]: number } = {};

  posts.forEach((post) => {
    categories[post.category] = (categories[post.category] || 0) + 1;
  });

  return categories;
}

/**
 * 根据标签筛选文章
 */
export async function getPostsByTag(tag: string): Promise<PostMetadata[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.tags.includes(tag));
}

/**
 * 根据分类筛选文章
 */
export async function getPostsByCategory(category: string): Promise<PostMetadata[]> {
  const posts = await getAllPosts();
  return posts.filter((post) => post.category === category);
}

/**
 * 搜索文章
 */
export async function searchPosts(query: string): Promise<PostMetadata[]> {
  const posts = await getAllPosts();
  const lowerQuery = query.toLowerCase();

  return posts.filter(
    (post) =>
      post.title.toLowerCase().includes(lowerQuery) ||
      post.description.toLowerCase().includes(lowerQuery) ||
      post.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      post.category.toLowerCase().includes(lowerQuery)
  );
}

/**
 * 获取相邻文章（上一篇/下一篇）
 */
export async function getAdjacentPosts(slug: string): Promise<{
  prev: PostMetadata | null;
  next: PostMetadata | null;
}> {
  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === slug);

  if (currentIndex === -1) {
    return { prev: null, next: null };
  }

  return {
    prev: currentIndex > 0 ? posts[currentIndex - 1] : null,
    next: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
  };
}
