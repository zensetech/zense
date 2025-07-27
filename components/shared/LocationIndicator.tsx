'use client';

import { MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LocationIndicatorProps {
  location: string;
  onClear?: () => void;
}

export function LocationIndicator({ location, onClear }: LocationIndicatorProps) {
  if (!location) return null;

  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-secondary rounded-full">
      <MapPin className="w-4 h-4 text-muted-foreground" />
      <span className="text-sm">{location}</span>
      {onClear && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 w-6 p-0 hover:bg-secondary-foreground/10"
          onClick={onClear}
        >
          ×
        </Button>
      )}
    </div>
  );
}