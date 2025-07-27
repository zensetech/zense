'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { PincodeData } from '@/app/data/pincodes/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CareTypeStep } from './steps/CareTypeStep';
import { VerificationStep } from './steps/VerificationStep';

export type CareType = 'nurse' | 'attendant';
type Step = 'care-type';

interface SearchFlowProps {
  isOpen: boolean;
  location: PincodeData;
  onClose: () => void;
}

export function SearchFlow({ isOpen,  location, onClose }: SearchFlowProps) {
  const router = useRouter();
  const [step, setStep] = useState<Step>('care-type');
  const [careType, setCareType] = useState<CareType | null>(null);

  const handleComplete = (type:any) => {
    // Navigate to providers page with all params
    // const params = new URLSearchParams({
    //  ( locationxs.pincode && pincode),
    //   ...(subCategory && { subCategory })
    // });
    router.push('/providers?location='+ location.pincode +'&subCategory=' + type + "&district="+location.district);
    onClose();
  };

  const resetFlow = () => {
    setStep('care-type');
    setCareType(null);
  };

  const handleClose = () => {
    resetFlow();
    onClose();
  };

  const stepTitles = {
    'care-type': 'Select Care Provider Type'
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{stepTitles[step]}</DialogTitle>
        </DialogHeader>

        {step === 'care-type' && (
          <CareTypeStep 
            onSelect={(type) => {
              setCareType(type);
              handleComplete(type);
            }} 
          />
        )}
      </DialogContent>
    </Dialog>
  );
}