'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { PhoneInput } from './PhoneInput';
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { auth } from '@/firebaseConfig';

const MOCK_OTP = '123456'; // Fixed OTP for testing

interface VerificationStepProps {
  onComplete: () => void;
}

export function VerificationStep({ onComplete }: VerificationStepProps) {
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOTP] = useState('');
  const [confirmationResult, setConfirmationResult] =  useState<ConfirmationResult | null>(null);

  const handleSendOTP = async () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    try {
      // Initialize reCAPTCHA verifier *only once*
      const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
        callback: (response: any) => {
          console.log('reCAPTCHA resolved:', response);
        },
        'expired-callback': () => { // Handle expired reCAPTCHA
          toast.error("reCAPTCHA expired. Please try again.");
        }
      });

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        `${countryCode}${phoneNumber}`,
        recaptchaVerifier
      );

      setConfirmationResult(confirmationResult); // Store for later use
      setShowOTP(true);
      toast.success('OTP sent successfully!'); // Don't show a mock OTP in production!

    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error('Error sending OTP. Please try again.');
    }
  };

  const handleVerifyOTP = async () => {
    if (!confirmationResult || !otp) {
      toast.error("Please enter the OTP and try again.");
      return;
    }

    try {
      await confirmationResult.confirm(otp);  // Use the stored confirmation result
      onComplete(); // OTP verified successfully
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="grid gap-4 py-4">
      {!showOTP ? (
        <>
          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <PhoneInput
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onCountryCodeChange={setCountryCode}
              onPhoneNumberChange={setPhoneNumber}
            />
          </div>
          <Button onClick={handleSendOTP}>Send OTP</Button>
        </>
      ) : (
        <>
          <div className="grid gap-2">
            <Label htmlFor="otp">Enter OTP</Label>
            <Input
              id="otp"
              type="text"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              placeholder="Enter OTP"
              maxLength={6}
            />
          </div>
          <Button onClick={handleVerifyOTP}>Verify OTP</Button>
        </>
      )}
    </div>
  );
}