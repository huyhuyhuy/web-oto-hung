'use client';

import { useState } from 'react';
import Image from 'next/image';

interface CarGalleryProps {
  imageUrls: string[]; // Array of processed URLs
  carName: string;
}

export default function CarGallery({ imageUrls, carName }: CarGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (imageUrls.length === 0) {
    return (
      <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl bg-gray-200 flex items-center justify-center text-gray-400">
        No Image
      </div>
    );
  }

  return (
    <div>
      {/* Ảnh lớn */}
      <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-xl mb-4">
        <Image
          src={imageUrls[selectedIndex]}
          alt={carName}
          fill
          className="object-cover"
          priority={selectedIndex === 0}
          sizes="(max-width: 1024px) 100vw, 66vw"
        />
      </div>
      
      {/* Gallery thumbnail */}
      {imageUrls.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {imageUrls.slice(0, 4).map((url, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative h-24 rounded overflow-hidden shadow border-2 transition-all ${
                selectedIndex === idx 
                  ? 'border-primary ring-2 ring-primary' 
                  : 'border-gray-300 hover:border-primary'
              }`}
            >
              <Image
                src={url}
                alt={`${carName} - ${idx + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 10vw"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
