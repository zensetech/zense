'use client';

import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  path?: string;
}

export function ImageUpload({ onUpload }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // For development, we'll use a mock URL
      // In production, this would upload to S3 or another storage service
      const mockUrl = URL.createObjectURL(file);
      onUpload(mockUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*,.pdf"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />
      <Button
        type="button"
        variant="outline"
        disabled={isUploading}
        onClick={() => document.getElementById('image-upload')?.click()}
      >
        <Upload className="w-4 h-4 mr-2" />
        {isUploading ? 'Uploading...' : 'Upload File'}
      </Button>
    </div>
  );
}