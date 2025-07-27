'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Star, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { Provider } from '@/app/types/provider';

interface ProviderCardProps {
  provider: Provider;
}

export function ProviderCard({ provider }: ProviderCardProps) {
  const displayServices = provider.type === 'home' 
    ? provider.amenities.slice(0, 3)
    : provider.qualifications.slice(0, 3);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={provider.imageUrl}
            alt={provider.name}
            fill
            className="object-cover"
          />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xl font-semibold">{provider.name}</h3>
          {provider.rating && (
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1">{provider.rating}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm">{provider.location}</span>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {provider.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {displayServices.map((service) => (
            <Badge key={service} variant="secondary">
              {service}
            </Badge>
          ))}
        </div>

        <Button asChild className="w-full">
          <Link href={`/providers/${provider.id}`}>View Profile</Link>
        </Button>
      </CardContent>
    </Card>
  );
}