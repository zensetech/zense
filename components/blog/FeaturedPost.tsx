import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { BlogPost } from "@/lib/blog-types";

interface FeaturedPostProps {
  post: BlogPost;
}

// Helper function to truncate text to a specified number of words
const truncateText = (text: string, wordLimit: number) => {
  if (!text) return "";
  const words = text.split(" ");
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "...";
  }
  return text;
};

export default function FeaturedPost({ post }: FeaturedPostProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <div className="rounded-xl overflow-hidden bg-card transition-all duration-200 group relative">
        <div className="flex flex-col lg:flex-row">
          <div className="relative w-full lg:w-7/12 h-[200px] lg:h-[400px]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80"></div>
            {/* Removed Read article link from here */}
          </div>

          <div className="relative lg:w-5/12 p-6 lg:p-8 flex flex-col h-full">
            <div className="mb-4 flex flex-wrap gap-2">
              <Badge className="bg-primary hover:bg-primary/90">Featured</Badge>
              {post.categories &&
                post.categories.length > 0 && ( // Conditionally render if categories exist
                  <Badge
                    key={post.categories[0]}
                    variant="secondary"
                    className="hover:bg-secondary/80"
                  >
                    {post.categories[0]}
                  </Badge>
                )}
            </div>

            <h2 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
              {post.title}
            </h2>

            <p className="text-muted-foreground mb-6">
              {truncateText(post.excerpt, 30)}
            </p>

            <div className="flex items-center space-x-1 mb-6 mt-auto">
              <Avatar>
                <AvatarImage
                  src={post.author?.image || "/uploads/icon.png"}
                  alt={post.author?.name}
                />{" "}
                {/* Use authorImage */}
                <AvatarFallback>
                  {post.author?.name
                    ? post.author.name.charAt(0)
                    : "Zense Team"}
                </AvatarFallback>{" "}
                {/* Use authorName */}
              </Avatar>
              <div>
                <p className="font-medium text-sm">
                  {post.author?.name || "Zense Team"}
                </p>{" "}
                {/* Use authorName */}
              </div>
            </div>

            {/* Added Read article link back here */}
            <Button className="group/button w-fit inline-flex items-center">
              Read article
              <ArrowRight className="ml-2 h-4 w-4 group-hover/button:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
