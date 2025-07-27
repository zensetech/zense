"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blog-types";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Facebook,
  Twitter,
  Linkedin,
  Heart,
  Bookmark,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BlogHeader from "@/components/blog/BlogHeader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import RelatedPosts from "@/components/blog/RelatedPosts"; // Import RelatedPosts
import React, { useEffect, useState, lazy, Suspense, useRef } from "react";

const ReactMarkdown = lazy(() => import("react-markdown"));

export default function BlogPostPage() {
  const { slug } = useParams() as { slug: string };
  const hasIncrementedView = useRef(false);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]); // State for related posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const [showHeader, setShowHeader] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setShowHeader(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch the current blog post
        const postRes = await fetch(`/api/blogs?slug=${slug}`);
        if (!postRes.ok) throw new Error("Blog post not found");
        const postData = await postRes.json();

        if (!postData.category) throw new Error("Invalid blog post data");
        setPost(postData as BlogPost & { id: string });

        // Fetch all blog posts to find related ones
        const allPostsRes = await fetch("/api/blogs");
        if (!allPostsRes.ok) throw new Error("Failed to fetch all blog posts");
        const allPostsData: BlogPost[] = await allPostsRes.json();

        // Filter for related posts (e.g., by category, excluding the current post)
        const related = allPostsData.filter(
          (blog) =>
            blog.categories === postData.categories && blog.slug !== slug
        );
        setRelatedPosts(related);

      } catch (err: any) {
        setError(err.message || "Failed to load blog post or related posts");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchData();
  }, [slug]);

  // Effect to increment view count
  useEffect(() => {
    const incrementView = async () => {
      if (slug && !hasIncrementedView.current) {
        try {
          await fetch(`/api/blogs?slug=${slug}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ incrementView: true }),
          });
          hasIncrementedView.current = true; // Mark as incremented
        } catch (error) {
          console.error("Error incrementing view count:", error);
        }
      }
    };

    incrementView();
  }, [slug]); // Run this effect only when slug changes

  if (loading) {
    return (
      <div className="text-center py-20 text-xl font-semibold">Loading...</div>
    );
  }

  if (error || !post) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-500">Error</h1>
        <p>{error}</p>
        <Button className="mt-4" onClick={() => router.push("/blog")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader showHeader={showHeader} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-4xl">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to blog
          </Link>
        </Button>

        {/* Categories */}
        <div className="flex gap-2 mb-4">
          <Badge>{post.categories}</Badge>
        </div>

        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {/* Author & Meta */}
        <div className="flex items-center gap-2 mb-8 text-sm text-muted-foreground">
          <Avatar>
            <AvatarImage src={post.author?.image || "/uploads/icon.png"} />
            <AvatarFallback>{post.author?.name?.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{post.author?.name || "Zense Team"}</span>
          <Clock className="w-4 h-4" />
          <span>{post.readingTime || 5} min read</span>
        </div>

        {/* Cover Image */}
        <div className="relative w-full h-[250px] sm:h-[350px] md:h-[400px] mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Blog Content */}
        <article className="prose prose-base lg:prose-lg dark:prose-invert max-w-none">
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        </article>

        {/* Social Buttons */}
        <div className="flex gap-4 mt-8">
          <Button
            variant="outline"
            onClick={() =>
              window.open(
                `https://twitter.com/intent/tweet?url=${shareUrl}`,
                "_blank"
              )
            }
          >
            <Twitter className="h-4 w-4 mr-2" />
            Tweet
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              window.open(
                `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
                "_blank"
              )
            }
          >
            <Facebook className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button
            variant="outline"
            onClick={() =>
              window.open(
                `https://www.linkedin.com/shareArticle?url=${shareUrl}`,
                "_blank"
              )
            }
          >
            <Linkedin className="h-4 w-4 mr-2" />
            LinkedIn
          </Button>
        </div>

        {/* Bookmark & Like */}
        <div className="flex gap-4 mt-4">
          <Button
            variant={isLiked ? "default" : "outline"}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className="h-4 w-4 mr-2" />
            {isLiked ? "Liked" : "Like"}
          </Button>
          <Button
            variant={isSaved ? "default" : "outline"}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark className="h-4 w-4 mr-2" />
            {isSaved ? "Saved" : "Save"}
          </Button>
        </div>

        <Separator className="my-10" />
        <BlogNewsletter />
        <RelatedPosts posts={relatedPosts} /> {/* Add RelatedPosts component */}
      </main>
    </div>
  );
}
