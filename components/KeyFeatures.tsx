// components/sections/key-features.tsx
"use client";

import { 
  Check, 
  Users, 
  Calendar,
  Star,
  MessageSquare
} from "lucide-react";

export function KeyFeatures() {
  const features = [
    { icon: <Check className="h-8 w-8 text-teal-700" />, text: "Verified Care Providers" },
    { icon: <Users className="h-8 w-8 text-teal-700" />, text: "Personalized Consultation" },
    { icon: <Calendar className="h-8 w-8 text-teal-700" />, text: "Seamless Booking" },
    { icon: <Star className="h-8 w-8 text-teal-700" />, text: "Transparent Pricing" },
    { icon: <MessageSquare className="h-8 w-8 text-teal-700" />, text: "Customer Support" }
  ];

  return (
    <section id="why-choose" className="py-24 bg-white">
<h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-teal-700">
        Why choose Zense?
        </h2>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 bg-white"
            >
              <div className="mb-4">
                {feature.icon}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-teal-700">
                {feature.text}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}