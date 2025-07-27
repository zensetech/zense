'use client';

import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface ServiceDurationFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function ServiceDurationFilter({ value, onChange }: ServiceDurationFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Service Duration</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select duration" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="hourly">Hourly</SelectItem>
          <SelectItem value="12-hours">12 Hours</SelectItem>
          <SelectItem value="24-hours">24 Hours</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}