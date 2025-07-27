import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AVAILABILITY_OPTIONS } from '@/app/constants/filters';

interface AvailabilityFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function AvailabilityFilter({ value, onChange }: AvailabilityFilterProps) {
  return (
    <div className="space-y-2">
      <Label>Availability</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select availability" />
        </SelectTrigger>
        <SelectContent>
          {AVAILABILITY_OPTIONS.map(({ id, value, label }) => (
            <SelectItem key={id} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}