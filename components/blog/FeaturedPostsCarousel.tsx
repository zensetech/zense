import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeaturedPost from "./FeaturedPost";
import { BlogPost } from "@/lib/blog-types";

interface FeaturedPostsCarouselProps {
  posts: BlogPost[];
}

export default function FeaturedPostsCarousel({
  posts,
}: FeaturedPostsCarouselProps) {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isDelayed, setIsDelayed] = useState(false);

  useEffect(() => {
    const initialDelay = setTimeout(() => {
      setIsDelayed(true);
    }, 3000); // 3 seconds delay

    return () => clearTimeout(initialDelay);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api || !isDelayed) {
      return;
    }

    // Auto-rotate every 5 seconds
    const autoRotate = setInterval(() => {
      api.scrollNext();
    }, 5000);

    // Clear interval on unmount
    return () => clearInterval(autoRotate);
  }, [api, isDelayed]);

  return (
    <div className="relative">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        setApi={setApi}
        className="w-full"
      >
        <CarouselContent>
          {posts.map((post, index) => (
            <CarouselItem key={post.id} className="md:basis-full">
              <FeaturedPost post={post} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>

      {/* Carousel indicators */}
      <div className="flex justify-center gap-2 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={`h-2 rounded-full transition-all ${
              index === current ? "w-8 bg-primary" : "w-2 bg-primary/30"
            }`}
            onClick={() => api?.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
}
