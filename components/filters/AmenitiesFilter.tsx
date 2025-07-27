'use client';

import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AMENITIES } from '@/app/types/filters';

interface AmenitiesFilterProps {
  selected: string[];
  onChange: (values: string[]) => void;
}

export function AmenitiesFilter({ selected, onChange }: AmenitiesFilterProps) {
  const toggleAmenity = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <div className="space-y-2">
      <Label>Amenities</Label>
      <ScrollArea className="h-[120px] rounded-md border p-2">
        <div className="flex flex-wrap gap-2">
          {AMENITIES.map(({ value, label }) => (
            <Badge
              key={`amenity-${value}`}
              variant={selected.includes(value) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleAmenity(value)}
            >
              {label}
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}