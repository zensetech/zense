"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight, Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogHeader from "@/components/blog/BlogHeader";
import FeaturedPostsCarousel from "@/components/blog/FeaturedPostsCarousel";
import PostCard from "@/components/blog/PostCard";
import BlogNewsletter from "@/components/blog/BlogNewsletter";
import { BlogPost } from "@/lib/blog-types";
import { getBlogPosts } from "@/lib/getBlogPosts";

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [blogPosts, setBlogPosts] = useState<(BlogPost & { id: string })[]>([]);
  const [displayedPosts, setDisplayedPosts] = useState<
    (BlogPost & { id: string })[]
  >([]);
  const [showHeader, setShowHeader] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state

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
    const fetchBlogPosts = async () => {
      try {
        setLoading(true); // Set loading to true before fetching
        const response = await fetch("/api/blogs");
        if (response.ok) {
          const data: (BlogPost & { id: string })[] = await response.json();
          console.log("Fetched blog posts:", data);
          setBlogPosts(data);
        } else {
          console.error("Failed to fetch blog posts from API");
        }
      } catch (error) {
        console.error("Error fetching blog posts:", error);
      } finally {
        setLoading(false); // Set loading to false after fetching (success or error)
      }
    };

    fetchBlogPosts();
  }, []);

  useEffect(() => {
    const filtered = blogPosts.filter(
      (post) =>
        post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setDisplayedPosts(filtered);
    console.log("Filtered blog posts:", filtered);
  }, [blogPosts, searchQuery]);

  // post.categories?.some((category) =>
  //   category.toLowerCase().includes(searchQuery.toLowerCase())
  // )

  const featuredPosts = blogPosts.slice(0, 3);

  const categories = [
    "All",
    "Health",
    "Travel",
    "Lifestyle",
    "Inspiration",
    "Home & Family",
    "Money-Matters",
    "Food",
    "Retirement",
  ];

  return (
    <div className="min-h-screen bg-background">
      <BlogHeader showHeader={showHeader} />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? ( // Conditionally render loading spinner
          <div className="flex justify-center items-center h-64">
            <LoadingSpinner />
          </div>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
              <div>
                <h1 className="text-4xl font-bold tracking-tight">Blogs</h1>
                <p className="text-muted-foreground mt-2 text-lg">
                  Insights and inspiration for a better life
                </p>
              </div>

              <div className="relative w-full md:w-64 lg:w-72">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {searchQuery === "" && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
                <FeaturedPostsCarousel posts={featuredPosts} />
              </div>
            )}

            <Tabs defaultValue="All" className="mt-16">
              <div className="border-b">
                {/* Wrap TabsList in a scrollable container for mobile */}
                <div className="overflow-x-auto whitespace-nowrap no-scrollbar md:overflow-visible">
                  <TabsList className="bg-transparent inline-flex">
                    {categories.map((category) => (
                      <TabsTrigger
                        key={category}
                        value={category}
                        className="data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:shadow-none rounded-none px-4 py-2"
                      >
                        {category}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
              </div>

              {categories.map((category) => {
                const currentPosts =
                  category === "All"
                    ? displayedPosts
                    : displayedPosts.filter(
                        (post) =>
                          post?.category.trim().toLowerCase() ===
                          category.trim().toLowerCase()
                      );

                // post.categories?.some(
                //   (cat) =>
                //     cat.trim().toLowerCase() ===
                //     category.trim().toLowerCase()
                // )

                return (
                  <TabsContent key={category} value={category} className="mt-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {currentPosts.map((post) => (
                        <PostCard key={post.id} post={post} />
                      ))}
                    </div>

                    {currentPosts.length === 0 && (
                      <div className="text-center py-16">
                        <h3 className="text-xl font-medium">No posts found</h3>
                        <p className="text-muted-foreground mt-2">
                          Try adjusting your search or filter to find what
                          you're looking for.
                        </p>
                      </div>
                    )}
                  </TabsContent>
                );
              })}
            </Tabs>

            <div className="mt-16 text-center">
              <Button variant="outline" size="lg" className="group">
                Load more articles
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div id="subscribe-section">
              <BlogNewsletter />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
