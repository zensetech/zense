import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BlogPost } from "@/lib/blog-types";

interface PostCardProps {
  post: BlogPost;
}

export default function PostCard({ post }: PostCardProps) {
  console.log("Post slug:", post.slug); // Add console log for the slug
  return (
    <Link href={`/blog/${post.slug}`} className="block h-full">
      <Card className="overflow-hidden h-full flex flex-col transform transition duration-300 hover:shadow-md hover:-translate-y-1">
        <div className="relative w-full h-32 sm:h-48 block overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <CardContent className="pt-5 px-5 flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories &&
              post.categories.length > 0 && ( // Check if categories array is not empty
                <Badge
                  key={post.categories[0]}
                  variant="secondary"
                  className="text-xs"
                >
                  {post.categories[0]}
                </Badge>
              )}
          </div>

          <h3 className="text-xl font-bold mb-3 transition-colors hover:text-primary line-clamp-2">
            {post.title}
          </h3>

          <p className="text-muted-foreground line-clamp-3 mb-4">
            {post.excerpt}
          </p>
        </CardContent>

        <CardFooter className="px-5 pt-0 pb-5 flex flex-col items-start gap-4">
          <div className="flex items-center space-x-1">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={post.author?.image || "/uploads/icon.png"}
                alt={post.author?.name}
              />
              <AvatarFallback>{post.author?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm">
              <p className="font-medium">{post.author?.name || "Zense Team"}</p>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="mr-1 h-3 w-3" />
                <span>{post?.readingTime || "5"} min read</span>
              </div>
            </div>
          </div>

          <div className="p-0 h-auto font-medium hover:bg-transparent hover:text-primary group self-start inline-flex items-center">
            Read more
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
