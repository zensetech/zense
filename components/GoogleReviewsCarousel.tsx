import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  CarouselContent,
} from "@/components/ui/carousel"
import {
  type CarouselApi
} from "@/components/ui/carousel"
import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Review {
  author_name: string;
  text: string;
  rating: number;
}

interface GoogleReviewsCarouselProps {
  reviews: Review[];
}

export function GoogleReviewsCarousel({ reviews }: GoogleReviewsCarouselProps) {
  const [api, setApi] = React.useState < CarouselApi > ()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedReviewText, setSelectedReviewText] = React.useState('');

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  return (
    <>
    <Carousel
      setApi={setApi}
      opts={{
        align: "start",
      }}
      className="w-full max-w-xs"
    >
      <CarouselContent>
        {reviews.map((review, index) => (
          <Card key={index}>
            <CardContent className="flex flex-col justify-between p-6 h-48">
              <div className="text-center flex-grow overflow-hidden">
                <p className="text-lg font-semibold">{review.author_name}</p>
                <p className="text-sm text-gray-600 line-clamp-4">{review.text}</p>
                {review.text.length > 200 && (
                  <button
                    className="text-blue-600 hover:underline text-sm mt-1"
                    onClick={() => {
                      setSelectedReviewText(review.text);
                      setIsModalOpen(true);
                    }}
                  >
                    Read more
                  </button>
                )}
              </div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.034a1 1 0 00-1.175 0l-2.817 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </CarouselContent>
      <div className="py-2 text-center text-sm text-gray-500">
        Slide {current} of {count}
      </div>
    </Carousel>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Full Review</DialogTitle>
            <DialogDescription>
              Read the complete testimonial.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>{selectedReviewText}</p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
