'use client';

import { useState } from 'react';
import { Search, MapPin, User, Hospital } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SearchFlow } from './search/SearchFlow';
import { usePincodeSearch } from '@/app/hooks/usePincodeSearch';
import { cn } from '@/lib/utils';
import type { PincodeData } from '@/app/data/pincodes/types';
import { useRouter } from 'next/navigation';

export function PincodeSearch() {
  const [query, setQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<PincodeData>();
  const [showSearchFlow, setShowSearchFlow] = useState(false);
  const [showPredefinedOptions, setShowPredefinedOptions] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { results, isLoading, error } = usePincodeSearch(query);
  const router = useRouter();

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
    setShowPredefinedOptions(false);
  };

  const handleCloseSearchFlow = () => {
    setShowSearchFlow(false);
    setSelectedLocation(undefined);
    setQuery('');
  };

  const handlePredefinedOptionClick = (type: 'nurse' | 'attendant') => {
    // Navigate directly to providers page with Delhi NCR parameters
    router.push('/providers?location=110001&subCategory=' + type + '&district=New Delhi');
    setShowPredefinedOptions(false);
    setQuery('');
  };

  const handleInputFocus = () => {
    setIsFocused(true);
    if (!query && !selectedLocation) {
      setShowPredefinedOptions(true);
    }
  };

  const handleInputBlur = () => {
    setIsFocused(false);
    // Delay hiding predefined options to allow for clicks
    setTimeout(() => {
      setShowPredefinedOptions(false);
    }, 200);
  };

  const predefinedOptions = [
    {
      type: 'attendant' as const,
      title: 'Find all attendants in Delhi NCR',
      description: 'Browse qualified attendants across Delhi NCR',
      icon: User,
      color: 'bg-blue-50 hover:bg-blue-100 border-blue-200'
    },
    {
      type: 'nurse' as const,
      title: 'Find all nurses in Delhi NCR',
      description: 'Browse qualified nurses across Delhi NCR',
      icon: User,
      color: 'bg-pink-50 hover:bg-pink-100 border-pink-200'
    }
  ];

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative border-stone-950">
        <Input
          type="text"
          placeholder="Enter pincode or area name..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (e.target.value.length > 0) {
              setShowPredefinedOptions(false);
            } else if (isFocused) {
              setShowPredefinedOptions(true);
            }
          }}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
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

      {/* Predefined Options */}
      {showPredefinedOptions && !query && !selectedLocation && (
        <div className="absolute w-full mt-1 bg-white rounded-md shadow-lg border z-50">
          <div className="p-3 border-b border-gray-100">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Search Options</h3>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {predefinedOptions.map((option) => {
              const IconComponent = option.icon;
              return (
                <button
                  key={option.type}
                  onClick={() => handlePredefinedOptionClick(option.type)}
                  className={cn(
                    "w-full px-4 py-4 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b last:border-0 transition-colors",
                    option.color
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      option.type === 'attendant' ? 'bg-blue-100' : 'bg-pink-100'
                    )}>
                      <IconComponent className={cn(
                        "h-5 w-5",
                        option.type === 'attendant' ? 'text-blue-600' : 'text-pink-600'
                      )} />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{option.title}</div>
                      <div className="text-sm text-gray-600">{option.description}</div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Pincode Search Results */}
      {query.length >= 3 && !selectedLocation && results.length > 0 && !showPredefinedOptions && (
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