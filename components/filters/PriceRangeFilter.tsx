'use client';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface PriceRangeFilterProps {
  value: number[];
  onChange: (value: number[]) => void;
}

export function PriceRangeFilter({ value, onChange }: PriceRangeFilterProps) {
  return (
    <div className="space-y-4">
      <Label>Price Range</Label>
      <Slider
        min={0}
        max={1000}
        step={50}
        value={value}
        onValueChange={onChange}
        className="mt-2"
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>${value[0]}</span>
        <span>${value[1]}</span>
      </div>
    </div>
  );
}