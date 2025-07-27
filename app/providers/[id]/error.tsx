'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function ProviderError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong!</h1>
      <p className="text-lg text-muted-foreground mb-8">
        We encountered an error while loading the provider details.
      </p>
      <Button onClick={reset}>Try again</Button>
    </div>
  );
}