import React from 'react';
import styles from './ScrollingTestimonials.module.css';
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

interface Testimonial {
  name: string;
  text: string;
}

interface ScrollingTestimonialsProps {
  testimonials: Testimonial[];
}

const ScrollingTestimonials: React.FC<ScrollingTestimonialsProps> = ({ testimonials }) => {
  // Duplicate testimonials for seamless looping
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className={styles.viewport}>
      <div className={styles.flexContainer}>
        {duplicatedTestimonials.map((testimonial, index) => (
          <div key={index} className={styles.testimonialBox}>
            <Card className="testimonial-card border-none h-full">
              <CardContent className="p-8">
                <div className="flex gap-4">
                  <Quote className="h-8 w-8 text-accent/20 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-gray-600 mb-4 italic">{testimonial.text}</p>
                    <p className="font-semibold text-accent">{testimonial.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollingTestimonials;
