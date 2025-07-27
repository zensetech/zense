import { notFound } from "next/navigation";
import { MapPin, Clock, Award } from "lucide-react";
import { Gallery } from "./components/Gallery";
// import { Reviews } from './components/Reviews';
import { BookingForm } from "./components/BookingForm";
import { Badge } from "@/components/ui/badge";
import { mockProviders } from "@/app/data/providers";
import type { AtHomeCare } from "@/app/types/provider";

export async function generateStaticParams() {
  // Replace with actual data fetching logic
  const providers = [{ id: "1" }, { id: "2" }, { id: "3" }];

  return providers.map((provider) => ({
    id: provider.id,
  }));
}

interface ProviderPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ProviderPage({ params }: ProviderPageProps) {
  const { id } = await params;
  const provider = mockProviders.find((p) => p.id === id);

  if (!provider) {
    notFound();
  }

  // const reviews = mockReviews.filter((r) => r.providerId === provider.id);
  const isAtHomeCare = provider.type === "at-home-care";
  const atHomeCareProvider = isAtHomeCare ? (provider as AtHomeCare) : null;

  return (
    <main className="container px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl font-bold mb-4">{provider.name}</h1>
            <div className="flex items-center space-x-4 text-muted-foreground mb-4">
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {provider.location}
              </div>
              {atHomeCareProvider?.availability && (
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {atHomeCareProvider.availability.days.join(", ")}
                </div>
              )}
              {provider.rating && (
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  {provider.rating} rating
                </div>
              )}
            </div>
            <p className="text-lg">{provider.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">
              {provider.type === "home"
                ? "Services & Amenities"
                : "Specializations & Languages"}
            </h2>
            {provider.type === "home" ? (
              <div className="flex flex-wrap gap-2">
                {provider.amenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary">
                    {amenity}
                  </Badge>
                ))}
              </div>
            ) : (
              <>
                <div className="flex flex-wrap gap-2">
                  {provider.qualifications.map((qual) => (
                    <Badge key={qual} variant="secondary">
                      {qual}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {provider.languages.map((lang) => (
                    <Badge key={lang} variant="outline">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </>
            )}
          </div>

          <Gallery photos={provider.photos} name={provider.name} />
          {/* <Reviews providerId={provider.id} initialReviews={reviews} /> */}
        </div>

        <div>
          <div className="sticky top-8">
            <BookingForm pricing={provider.pricing} />
          </div>
        </div>
      </div>
    </main>
  );
}
