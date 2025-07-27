"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ServiceTypeFilter } from "./ServiceTypeFilter";
import { SpecializationFilter } from "./SpecializationFilter";
import { LanguageFilter } from "./LanguageFilter";
import { AmenitiesFilter } from "./AmenitiesFilter";
import { PriceRangeFilter } from "./PriceRangeFilter";
import { AvailabilityFilter } from "./AvailabilityFilter";
import { ExperienceFilter } from "./ExperienceFilter";
import { RatingFilter } from "./RatingFilter";

interface FilterBarProps {
  onApplyFilters?: () => void;
}

export function FilterBar({ onApplyFilters }: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize filter states from URL params
  const [filters, setFilters] = useState({
    serviceType: searchParams?.get("serviceType") || "",
    specializations: searchParams?.get("specializations")?.split(",") || [],
    languages: searchParams?.get("languages")?.split(",") || [],
    amenities: searchParams?.get("amenities")?.split(",") || [],
    priceRange: [
      parseInt(searchParams?.get("minPrice") || "0"),
      parseInt(searchParams?.get("maxPrice") || "1000"),
    ],
    availability: searchParams?.get("availability") || "",
    experience: parseInt(searchParams?.get("experience") || "0"),
    rating: parseInt(searchParams?.get("rating") || "0"),
  });

  const updateFilter = (key: keyof typeof filters, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams?.toString());

    // Clear existing filter params
    [
      "serviceType",
      "specializations",
      "languages",
      "amenities",
      "minPrice",
      "maxPrice",
      "availability",
      "experience",
      "rating",
    ].forEach((key) => {
      params.delete(key);
    });

    // Add non-empty filters to params
    if (filters.serviceType) {
      params.set("serviceType", filters.serviceType);
    }

    if (filters.specializations.length) {
      params.set("specializations", filters.specializations.join(","));
    }

    if (filters.languages.length) {
      params.set("languages", filters.languages.join(","));
    }

    if (filters.amenities.length) {
      params.set("amenities", filters.amenities.join(","));
    }

    if (filters.priceRange[0] > 0) {
      params.set("minPrice", filters.priceRange[0].toString());
    }

    if (filters.priceRange[1] < 1000) {
      params.set("maxPrice", filters.priceRange[1].toString());
    }

    if (filters.availability) {
      params.set("availability", filters.availability);
    }

    if (filters.experience > 0) {
      params.set("experience", filters.experience.toString());
    }

    if (filters.rating > 0) {
      params.set("rating", filters.rating.toString());
    }

    router.push(`/providers?${params.toString()}`);
    onApplyFilters?.();
  };

  const handleReset = () => {
    setFilters({
      serviceType: "",
      specializations: [],
      languages: [],
      amenities: [],
      priceRange: [0, 1000],
      availability: "",
      experience: 0,
      rating: 0,
    });
    router.push("/providers");
    onApplyFilters?.();
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-6">
        <ServiceTypeFilter
          value={filters.serviceType}
          onChange={(value) => updateFilter("serviceType", value)}
        />

        <SpecializationFilter
          selected={filters.specializations}
          onChange={(value) => updateFilter("specializations", value)}
        />

        {/* <LanguageFilter
        value={filters.languages}
        onChange={(value) => updateFilter('languages', value)}
      /> */}

        <AmenitiesFilter
          selected={filters.amenities}
          onChange={(value) => updateFilter("amenities", value)}
        />

        <PriceRangeFilter
          value={filters.priceRange}
          onChange={(value) => updateFilter("priceRange", value)}
        />

        <AvailabilityFilter
          value={filters.availability}
          onChange={(value) => updateFilter("availability", value)}
        />

        <ExperienceFilter
          value={filters.experience}
          onChange={(value) => updateFilter("experience", value)}
        />

        <RatingFilter
          value={filters.rating}
          onChange={(value) => updateFilter("rating", value)}
        />

        <div className="space-y-2">
          <Button onClick={handleApplyFilters} className="w-full">
            Apply Filters
          </Button>

          <Button variant="outline" className="w-full" onClick={handleReset}>
            Reset Filters
          </Button>
        </div>
      </div>
    </Suspense>
  );
}
