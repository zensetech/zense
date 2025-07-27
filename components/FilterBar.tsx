'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const services = [
  'Full-time Care',
  'Part-time Care',
  'Respite Care',
  'Medical Care',
  'Companionship',
];

export function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams?.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/providers?${params.toString()}`);
  };

  const handleReset = () => {
    router.push('/providers');
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Location</Label>
        <Input 
          placeholder="Enter location..."
          defaultValue={searchParams?.get('location') || ''}
          onChange={(e) => handleFilter('location', e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Service Type</Label>
        <Select 
          defaultValue={searchParams?.get('service') || ''}
          onValueChange={(value) => handleFilter('service', value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select service" />
          </SelectTrigger>
          <SelectContent>
            {services.map((service) => (
              <SelectItem key={service} value={service.toLowerCase()}>
                {service}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Price Range (per hour)</Label>
        <div className="pt-2">
          <Slider
            defaultValue={[parseInt(searchParams?.get('maxPrice') || '100')]}
            max={100}
            step={1}
            onValueChange={(value) => handleFilter('maxPrice', value[0].toString())}
          />
          <div className="mt-2">
            Up to ${searchParams?.get('maxPrice') || '100'} per hour
          </div>
        </div>
      </div>

      <Button 
        variant="outline" 
        className="w-full"
        onClick={handleReset}
      >
        Reset Filters
      </Button>
    </div>
  );
}
