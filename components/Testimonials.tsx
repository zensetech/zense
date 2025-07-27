import React from "react";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const testimonials = [
  { text: "We used Zense's 24x7 elder care services for my elderly relative. The attendant was caring and diligent, checking her vitals and helping her with mobility. The service was consistent and professional throughout.", author: "Suyash", rating: 5 },
  { text: "Zense offers dependable home care services for seniors. Our caregiver was experienced and polite, but we faced a delay when we requested a replacement. While they managed it eventually, quicker turnaround would improve the experience. Still, overall service quality is solid.", author: "ankit bhalla", rating: 5 },
  { text: "Zense’s patient caretaker service helped my mother recover comfortably at home. The caregiver was patient, attentive, and kind. Their affordable elder care at home is a great option for working families.", author: "Vishal Chauhan", rating: 5 },
  { text: "We’ve used Zense for nearly a year now for my grandmother, and the experience has been excellent. The caregivers are well-trained in elder handling and are very hygienic. They treat elders with dignity, which really matters to us.", author: "Vaibhavi Sharma", rating: 5 },
  { text: "Zense offers great home care services for seniors, but we faced a delay during a last-minute caregiver replacement. While they resolved it, quicker turnaround would help. Overall, the caregiver quality was excellent and reliable.", author: "Utkarsh Shukla", rating: 5 },
  { text: "What we love about Zense is the consistency. No frequent staff changes or last-minute no-shows like we faced with others. The same caregiver has been with us for months, and that has helped build trust and emotional comfort for my grandfather.", author: "Annika Mehta", rating: 5 },
  { text: "Professional, compassionate, and always available—that’s how I would describe Zense. The entire team—from their operations head to the on-ground staff—is responsive and cooperative. Even when our regular attendant took leave, the replacement was equally well-prepared.", author: "Sonam Oberoi", rating: 5 },
  { text: "We hired Zense for post-surgery care for my aunt, and I can’t imagine how we would’ve managed without them. The caregiver was disciplined, polite, and medically knowledgeable. She kept my aunt’s spirits high during recovery. Truly grateful for their service.", author: "Shireen Sandilya", rating: 5 },
];

export default function Testimonials() {
  const isMobile = useMobile();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = React.useState<typeof testimonials[0] | null>(null);

  return (
    <>
    <section id="testimonials" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-accent">
          What People Say About Us
        </h2>
        {/* New Google Reviews Summary Section */}
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-8 w-full mx-auto md:max-w-2xl lg:max-w-4xl">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            {/* Google Reviews Text and Rating */}
            <div>
              <p className="text-xl font-bold">
                <span className="text-blue-600">G</span>
                <span className="text-red-600">o</span>
                <span className="text-yellow-600">o</span>
                <span className="text-blue-600">g</span>
                <span className="text-green-600">l</span>
                <span className="text-red-600">e</span> Reviews
              </p>
              <div className="flex items-center justify-center sm:justify-start mt-1">
                {/* 5-star rating */}
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.034a1 1 0 00-1.175 0l-2.817 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                  </svg>
                ))}
            
              </div>
            </div>
          </div>
          {/* Review us on Google Button */}
          <a
            href="https://www.google.co.in/search?sca_esv=92e213fbdc0138c0&sxsrf=AE3TifPy8vNgyNCFMmugFRDxgVkCDhFvSQ:1749561092423&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E_zQdV_hAa1JqBVVspD_hMP7PWy8YwgbshfD4I4H6JfIhecslkyQnuxcek3murWPe1odjjxTEN4KrqvlWZeqxkLvaE8K&q=Zense+Reviews&sa=X&ved=2ahUKEwic37T79uaNAxUanq8BHREpCfsQ0bkNegQIIxAD&biw=1440&bih=785&dpr=2"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-block"
          >
            Review us on Google
          </a>
        </div>
        <Carousel
          opts={{
            align: "start",
          }}
          autoplay={!isMobile ? { delay: 5000 } : false} // Autoplay on desktop, manual swipe on mobile
          className="w-full max-w-xs mx-auto md:max-w-2xl lg:max-w-4xl"
        >
          <CarouselContent className="flex items-stretch">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-2/3 lg:basis-1/2 h-full">
                <Card className="testimonial-card border-none h-full">
                  <CardContent className="p-6 flex flex-col justify-between h-64">
                    <div className="flex flex-col flex-grow overflow-hidden">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <img src="/uploads/google-logo.png" alt="Google icon" className="h-5 w-5" />
                          <p className="text-lg font-semibold">{testimonial.author}</p>
                        </div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.034a1 1 0 00-1.175 0l-2.817 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-4 italic">{testimonial.text}</p>
                      {testimonial.text.length > 200 && (
                        <button
                          className="text-blue-600 hover:underline text-sm mt-1 text-left"
                          onClick={() => {
                            setSelectedTestimonial(testimonial);
                            setIsModalOpen(true);
                          }}
                        >
                          Read more
                        </button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
        ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          {selectedTestimonial && (
            <>
<DialogHeader>
  <div className="flex items-center gap-2">
    <img src="/uploads/google-logo.png" alt="Google icon" className="h-5 w-5" />
    <DialogTitle>{selectedTestimonial.author}</DialogTitle>
  </div>
  <DialogDescription asChild>
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < selectedTestimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.817 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.817-2.034a1 1 0 00-1.175 0l-2.817 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.462a1 1 0 00.95-.69l1.07-3.292z"></path>
        </svg>
      ))}
    </div>
  </DialogDescription>
</DialogHeader>
              <div className="py-4">
                <p className="text-gray-700">{selectedTestimonial.text}</p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
