import { Check, Users, Calendar, Star, MessageSquare } from "lucide-react";

const features = [
  { icon: <Check className="h-8 w-8 text-primary" />, text: "Verified Care Providers" },
  { icon: <Users className="h-8 w-8 text-primary" />, text: "Personalized Consultation" },
  { icon: <Calendar className="h-8 w-8 text-primary" />, text: "Seamless Booking" },
  { icon: <Star className="h-8 w-8 text-primary" />, text: "Transparent Pricing" },
  { icon: <MessageSquare className="h-8 w-8 text-primary" />, text: "Customer Support" }
];

export default function Features() {
  return (
    <section id="why-choose" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase">Why Trust Us</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-black">
            Why Choose Zense?
          </h2>
          <p className="text-lg text-black/80 leading-relaxed">
            At Zense, we understand that finding the right care for your loved ones is a deeply personal journey. Our platform combines compassionate care with cutting-edge technology to ensure your family receives nothing but the best support during their golden years.
          </p>
        </div>
        <div className="flex justify-evenly items-center flex-wrap gap-8">
          {features.map((feature, index) => (
            <div key={index} className="feature-card flex flex-col items-center text-center p-8 rounded-2xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              {feature.icon}
              <h3 className="mt-4 font-semibold text-black">{feature.text}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}