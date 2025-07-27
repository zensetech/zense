'use client';

import { Phone, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export function NoProvidersContact() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/1234567890', '_blank'); // Replace with your WhatsApp number
  };

  const handleCall = () => {
    window.location.href = 'tel:1234567890'; // Replace with your phone number
  };

  const handleEmail = () => {
    window.location.href = 'mailto:contact@care360.com'; // Replace with your email
  };

  const copyContact = (type: string, value: string) => {
    navigator.clipboard.writeText(value);
    toast.success(`${type} copied to clipboard!`);
  };

  return (
    <div className="text-center py-8 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">No providers found matching your criteria.</h3>
        <p className="text-muted-foreground">
          Contact us directly and we'll help you find the perfect care solution.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleWhatsApp}
        >
          <MessageSquare className="w-4 h-4 mr-2" />
          WhatsApp Us
        </Button>

        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleCall}
        >
          <Phone className="w-4 h-4 mr-2" />
          Call Us
        </Button>

        <Button
          variant="outline"
          className="w-full sm:w-auto"
          onClick={handleEmail}
        >
          <Mail className="w-4 h-4 mr-2" />
          Email Us
        </Button>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>Available 24/7 for your care needs</p>
      </div>
    </div>
  );
}