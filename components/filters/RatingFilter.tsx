'use client';

import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RATING_OPTIONS } from '@/app/constants/filters';

interface RatingFilterProps {
  value: number;
  onChange: (value: number) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Minimum Rating</Label>
      <div className="flex gap-2">
        {RATING_OPTIONS.map((rating) => (
          <Button
            key={`rating-${rating}`}
            variant={value === rating ? 'default' : 'outline'}
            size="sm"
            onClick={() => onChange(rating === value ? 0 : rating)}
            className="px-3"
          >
            <Star
              className={`h-4 w-4 ${
                value >= rating ? 'fill-current text-yellow-400' : ''
              }`}
            />
          </Button>
        ))}
      </div>
    </div>
  );
}