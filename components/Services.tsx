import { Home, Users, PhoneCall, Ambulance, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const services = [
  {
    icon: <Ambulance />,
    title: "Certified Nurses at Home",
    description:
      "Professional medical care delivered in the comfort of your Delhi home.",
  },
  {
    icon: <Users />,
    title: "Caring Attendants at Home",
    description:
      "Compassionate support for daily living, enhancing dignity and well-being in Delhi.",
  },
  {
    icon: <PhoneCall />,
    title: "Consultation Services",
    description: "Personalized guidance for families to choose the best care",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-black">
          Tailored Elder Care Solutions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-none"
            >
              <CardHeader>
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <div className="text-primary">{service.icon}</div>
                </div>
                <CardTitle className="text-black">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-black/70">
                  {service.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
