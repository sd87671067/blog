import { getAllPosts } from '@/lib/posts';
import HomeClient from '@/components/HomeClient';

export default async function Home() {
  const posts = await getAllPosts();
  const featuredPosts = posts.slice(0, 6);

  return <HomeClient posts={posts} featuredPosts={featuredPosts} />;
}
