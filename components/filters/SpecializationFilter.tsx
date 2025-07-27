'use client';

import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SPECIALIZATIONS } from '@/app/types/filters';

interface SpecializationFilterProps {
  selected: string[];
  onChange: (values: string[]) => void;
}

export function SpecializationFilter({ selected, onChange }: SpecializationFilterProps) {
  const toggleSpecialization = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(v => v !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  return (
    <div className="space-y-2">
      <Label>Specializations</Label>
      <ScrollArea className="h-[120px] rounded-md border p-2">
        <div className="flex flex-wrap gap-2">
          {SPECIALIZATIONS.map(({ value, label }) => (
            <Badge
              key={`specialization-${value}`}
              variant={selected.includes(value) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleSpecialization(value)}
            >
              {label}
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}