'use client';

import { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SearchFlow } from './search/SearchFlow';
import { usePincodeSearch } from '@/app/hooks/usePincodeSearch';
import { cn } from '@/lib/utils';
import type { PincodeData } from '@/app/data/pincodes/types';

export function PincodeSearch() {
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<PincodeData>();
  const [showSearchFlow, setShowSearchFlow] = useState(false);
  const { results, isLoading, error } = usePincodeSearch(query);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLocation) {
      setShowSearchFlow(true);
    }
  };

  const handleSelect = (result: PincodeData) => {
    setSelectedLocation(result);
    setQuery(`${result.officeName}, ${result.district}`);
    setShowSearchFlow(true);
  };

  const handleCloseSearchFlow = () => {
    setShowSearchFlow(false);
    setSelectedLocation(undefined);
    setQuery('');
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative border-stone-950">
        <Input
          type="text"
          placeholder="Enter pincode or area name..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          className={cn(
            "outline-none md:w-full h-12 pl-10 pr-12 text-lg shadow-sm",
            selectedLocation && "bg-green-50"
          )}
        />
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Button
          type="submit"
          size="icon"
          variant="ghost"
          className="absolute right-0 top-0 h-full"
          disabled={!selectedLocation}
        >
          <Search className="h-5 w-5" />
        </Button>
      </form>

      {query.length >= 3 && !selectedLocation && results.length > 0 && (
        <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg border z-50">
          <ScrollArea className="max-h-64 overflow-y-scroll">
            {results.map((result) => (
              <button
                key={`${result.pincode}-${result.officeName}`}
                onClick={() => handleSelect(result)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b last:border-0"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{result.officeName}</div>
                    <div className="text-sm text-muted-foreground">
                      {result.district}, {result.state}
                    </div>
                  </div>
                  <div className="text-sm font-mono text-muted-foreground">
                    {result.pincode}
                  </div>
                </div>
              </button>
            ))}
          </ScrollArea>
        </div>
      )}

      {selectedLocation && (
        <SearchFlow
          isOpen={showSearchFlow}
          onClose={handleCloseSearchFlow}
          location={selectedLocation}
        />
      )}
    </div>
  );
}