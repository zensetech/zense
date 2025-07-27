import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProviderNotFound() {
  return (
    <div className="container px-4 py-16 text-center">
      <h1 className="text-4xl font-bold mb-4">Provider Not Found</h1>
      <p className="text-lg text-muted-foreground mb-8">
        The care provider you're looking for doesn't exist or has been removed.
      </p>
      <Button asChild>
        <Link href="/providers">View All Providers</Link>
      </Button>
    </div>
  );
}