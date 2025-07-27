'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { countries } from '@/app/data/countries';

interface PhoneInputProps {
  countryCode: string;
  phoneNumber: string;
  onCountryCodeChange: (value: string) => void;
  onCountryCodeBlur?: () => void; // Make it optional
  onPhoneNumberChange: (value: string) => void;
}

export function PhoneInput({
  countryCode,
  phoneNumber,
  onCountryCodeChange,
  onCountryCodeBlur,
  onPhoneNumberChange,
}: PhoneInputProps) {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Create a unique list of country codes to prevent duplicate keys
  const uniqueCountries = countries.reduce((acc, country) => {
    if (!acc.find(c => c.dial_code === country.dial_code)) {
      acc.concat(country)
    }
    return acc;
  }, [] as unknown as typeof countries);

  const filteredCountries = uniqueCountries.filter(country => 
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.dial_code.includes(searchQuery) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex gap-2">
      <Select value={countryCode} onValueChange={onCountryCodeChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select">
            {countryCode}
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-background border">
          <div className="flex items-center px-3 pb-2 sticky top-0 bg-background border-b">
            <Search className="w-4 h-4 mr-2 text-muted-foreground" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
            />
          </div>
          <SelectGroup className="max-h-[300px] overflow-auto">
            {filteredCountries.map((country) => (
              <SelectItem
                key={`${country.code}-${country.dial_code}`}
                value={country.dial_code}
                className="flex items-center"
              >
                <span className="w-[60px] inline-block">{country.dial_code}</span>
                <span>{country.name}</span>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      
      <Input
        type="tel"
        value={phoneNumber}
        onChange={(e) => {
          const value = e.target.value.replace(/\D/g, '');
          if (value.length <= 15) {
            onPhoneNumberChange(value);
          }
        }}
        placeholder="Phone number"
        className="flex-1"
      />
    </div>
  );
}