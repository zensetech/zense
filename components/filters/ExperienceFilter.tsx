'use client';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface ExperienceFilterProps {
  value: number;
  onChange: (value: number) => void;
}

export function ExperienceFilter({ value, onChange }: ExperienceFilterProps) {
  return (
    <div className="space-y-4">
      <Label>Minimum Experience (Years)</Label>
      <Slider
        min={0}
        max={30}
        step={1}
        value={[value]}
        onValueChange={([val]) => onChange(val)}
        className="mt-2"
      />
      <div className="text-sm text-muted-foreground">
        {value} years+
      </div>
    </div>
  );
}