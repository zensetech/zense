'use client';

import { Hospital, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { CareType } from '../SearchFlow';

interface CareTypeStepProps {
  onSelect: (type: CareType) => void;
}

export function CareTypeStep({ onSelect }: CareTypeStepProps) {
  return (
    <div className="grid gap-4 py-4">
      <Button
        variant="outline"
        className="h-24 flex flex-col items-center justify-center gap-2"
        onClick={() => onSelect('nurse')}
      >
        <Hospital className="h-8 w-8" />
        <span>Nurse</span>
      </Button>
      
      <Button
        variant="outline"
        className="h-24 flex flex-col items-center justify-center gap-2"
        onClick={() => onSelect('attendant')}
      >
        <User className="h-8 w-8" />
        <span>Attendant</span>
      </Button>
    </div>
  );
}