"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LocationIndicator } from "@/components/shared/LocationIndicator";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

export function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams?.get("query") || "";
  const currentLocation = searchParams?.get("location") || "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const query = formData.get("query");
    const params = new URLSearchParams(searchParams?.toString());

    if (query) {
      params.set("query", query.toString());
    } else {
      params.delete("query");
    }

    router.push(`/providers?${params.toString()}`);
  };

  const clearLocation = () => {
    const params = new URLSearchParams(searchParams?.toString());
    params.delete("location");
    router.push(`/providers?${params.toString()}`);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="space-y-3">
        <form onSubmit={handleSubmit} className="relative">
          <Input
            name="query"
            type="text"
            placeholder="Search care providers..."
            defaultValue={currentQuery}
            className="pr-12"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="absolute right-0 top-0 h-full"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>

        {currentLocation && (
          <div>
            <LocationIndicator
              location={currentLocation}
              onClear={clearLocation}
            />
          </div>
        )}
      </div>
    </Suspense>
  );
}
