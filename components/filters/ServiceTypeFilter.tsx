'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CARE_TYPES } from '@/app/types/filters';

interface ServiceTypeFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function ServiceTypeFilter({ value, onChange }: ServiceTypeFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Service Type</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select service type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Care Types</SelectLabel>
            {CARE_TYPES.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}