import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { handleBlogRoutes, isFirstDate } from '@/utils/posts';

export default function PostsPage() {
  const posts = useMemo(handleBlogRoutes, []);
  if (posts.length === 0)
    return (
      <div>
        <p>No posts found.</p>
      </div>
    );

  return (
    <div className="w-prose mt-20">
      {posts.map((post) => (
        <div key={post.path} className="mt-5">
          {isFirstDate(post, posts!) && (
            <div className="relative h-[50px] pointer-events-none mt-10">
              <span className="absolute font-sans font-bold font-lato left--2rem text-8em op-10 top--30px dark:text-white">
                {post.year}
              </span>
            </div>
          )}
          <Link to={post.path} className="flex flex-col space-y-2 items-start p-2 rounded-lg ">
            <span className="text-xl dark:text-white">{post.title}</span>
            <span className="text-sm text-gray-600 dark:text-gray-300">{post.date}</span>
          </Link>
        </div>
      ))}
    </div>
  );
}
