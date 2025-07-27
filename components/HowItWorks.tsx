import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: "1",
    title: "Explore",
    description: "Browse our panel of professional Nurses and Attendants!",
  },
  {
    number: "2",
    title: "Connect",
    description: "Talk to providers or consult with our experts.",
  },
  {
    number: "3",
    title: "Book",
    description: "Get trusted care instantly, for you or your family!",
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-sm font-semibold tracking-wider text-primary uppercase">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-6 text-black">
            Your Journey to Quality Care
          </h2>
          <p className="text-lg text-black/80">
            We've simplified the process of finding the perfect care solution
            for your loved ones
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 hidden md:block transform -translate-y-1/2" />
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-8 shadow-lg transform transition-transform duration-300 group-hover:scale-110 relative z-10">
                {step.number}
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg transform transition-all duration-300 group-hover:-translate-y-2 relative w-full">
                <h3 className="text-xl font-semibold mb-4 text-black">
                  {step.title}
                </h3>
                <p className="text-black/70">{step.description}</p>
                {index < 2 && (
                  <ChevronRight className="hidden md:block absolute top-1/2 -right-10 text-primary/50 transform -translate-y-1/2 w-8 h-8" />
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link href="/#SEARCH">
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 text-lg px-12 py-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              Start Your Search
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
