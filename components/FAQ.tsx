import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-accent">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="border rounded-lg px-6">
            <AccordionTrigger className="text-accent hover:text-accent/90">
              How do I know the caregivers are trustworthy?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              We conduct background checks, verify certifications, and only list vetted providers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border rounded-lg px-6">
            <AccordionTrigger className="text-accent hover:text-accent/90">
              Can I speak to someone before booking a service?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Absolutely! Our consultants will help you make the best decision.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}