'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { LANGUAGES } from '@/app/types/filters';

interface LanguageFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function LanguageFilter({ value, onChange }: LanguageFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Preferred Language</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select language" />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGES.map(({ value, label }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}