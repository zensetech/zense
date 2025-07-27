import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Steps() {
  const steps = [
    { number: "1", title: "Explore", description: "Browse verified care options for home or senior living" },
    { number: "2", title: "Connect", description: "Talk to providers or consult with our experts" },
    { number: "3", title: "Book & Relax", description: "Get trusted care for your loved ones" }
  ];

  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-teal-700">
          Hassle-Free Process in 3 Simple Steps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-teal-700 text-white flex items-center justify-center text-2xl font-bold mb-6 shadow-lg">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-4 text-teal-700">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < 2 && (
                <ChevronRight className="hidden md:block absolute top-8 -right-4 text-teal-700/30 transform rotate-0" />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link href="/#SEARCH">
            <Button size="lg" className="bg-teal-700 text-white hover:bg-teal-700/90 text-lg px-8">
              Start Your Search
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}