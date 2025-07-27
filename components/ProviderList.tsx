"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProviderCard } from "./ProviderCard";
import { LoadingSpinner } from "@/components/shared/LoadingSpinner";
import { NoProvidersContact } from "@/components/shared/NoProvidersContact";
import { mockProviders } from "@/app/data/providers";
import type { Provider } from "@/app/types/provider";

export function ProviderList() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const filterProviders = () => {
      let filtered = [...mockProviders];

      // Basic filters
      const query = searchParams?.get("query")?.toLowerCase();
      const location = searchParams?.get("location")?.toLowerCase();
      const serviceType = searchParams?.get("serviceType")?.toLowerCase();
      const minPrice = parseInt(searchParams?.get("minPrice") || "0");
      const maxPrice = parseInt(searchParams?.get("maxPrice") || "1000");
      const rating = parseInt(searchParams?.get("rating") || "0");
      const experience = parseInt(searchParams?.get("experience") || "0");

      // Array filters
      const specializations =
        searchParams?.get("specializations")?.split(",") || [];
      const languages = searchParams?.get("languages")?.split(",") || [];
      const amenities = searchParams?.get("amenities")?.split(",") || [];

      if (query) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );
      }

      if (location) {
        filtered = filtered.filter((p) =>
          p.location.toLowerCase().includes(location)
        );
      }

      if (serviceType) {
        filtered = filtered.filter((p) => {
          if (p.type === "home") {
            return p.homeType === serviceType;
          }
          return p.careType === serviceType;
        });
      }

      // Price filter
      filtered = filtered.filter((p) => {
        const hourlyPrice = p.pricing.hourly || 0;
        return hourlyPrice >= minPrice && hourlyPrice <= maxPrice;
      });

      // Rating filter
      if (rating > 0) {
        filtered = filtered.filter((p) => (p.rating || 0) >= rating);
      }

      // Experience filter (for at-home-care providers)
      if (experience > 0) {
        filtered = filtered.filter((p) =>
          p.type === "at-home-care" ? p.experience >= experience : true
        );
      }

      // Specializations filter
      if (specializations.length > 0) {
        filtered = filtered.filter(
          (p) =>
            p.type === "at-home-care" &&
            specializations.every((s) => p.qualifications.includes(s))
        );
      }

      // Languages filter (for at-home-care providers)
      if (languages.length > 0) {
        filtered = filtered.filter(
          (p) =>
            p.type === "at-home-care" &&
            languages.every((l) => p.languages.includes(l))
        );
      }

      // Amenities filter (for care homes)
      if (amenities.length > 0) {
        filtered = filtered.filter(
          (p) =>
            p.type === "home" && amenities.every((a) => p.amenities.includes(a))
        );
      }

      setProviders(filtered);
      setIsLoading(false);
    };

    filterProviders();
  }, [searchParams]);

  if (isLoading) return <LoadingSpinner />;

  if (!providers.length) {
    return <NoProvidersContact />;
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="grid md:grid-cols-2 gap-6">
        {providers.map((provider) => (
          <ProviderCard key={provider.id} provider={provider} />
        ))}
      </div>
    </Suspense>
  );
}
