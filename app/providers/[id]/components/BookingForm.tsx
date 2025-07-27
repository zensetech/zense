'use client';

import { useState } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface BookingFormProps {
  pricing: {
    hourly?: number;
    daily?: number;
    monthly?: number;
  };
}

export function BookingForm({ pricing }: BookingFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Care Services</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Service Type</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select service type" />
            </SelectTrigger>
            <SelectContent>
              {pricing.hourly && (
                <SelectItem value="hourly">
                  Hourly Care (${pricing.hourly}/hour)
                </SelectItem>
              )}
              {pricing.daily && (
                <SelectItem value="daily">
                  Daily Care (${pricing.daily}/day)
                </SelectItem>
              )}
              {pricing.monthly && (
                <SelectItem value="monthly">
                  Monthly Care (${pricing.monthly}/month)
                </SelectItem>
              )}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Select Start Date</label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Request Booking</Button>
      </CardFooter>
    </Card>
  );
}