'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface GalleryProps {
  photos: string[];
  name: string;
}

export function Gallery({ photos, name }: GalleryProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Photo Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <Dialog key={index}>
            <DialogTrigger asChild>
              <div className="relative h-48 cursor-pointer rounded-lg overflow-hidden">
                <Image
                  src={photo}
                  alt={`${name} - Photo ${index + 1}`}
                  fill
                  className="object-cover hover:opacity-90 transition-opacity"
                />
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogTitle className="sr-only">
                {`${name} - Photo ${index + 1}`}
              </DialogTitle>
              <div className="relative h-[60vh]">
                <Image
                  src={photo}
                  alt={`${name} - Photo ${index + 1}`}
                  fill
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}