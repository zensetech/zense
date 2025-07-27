import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/blog-types';
import PostCard from './PostCard';

interface RelatedPostsProps {
  posts: BlogPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;
  
  return (
    <div className="mt-16 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Related articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
