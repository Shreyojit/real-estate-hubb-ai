import Image from 'next/image';
import React from 'react';

export default function PlaceImg({ place, index = 0, className = 'object-cover' }) {
  // Check if there are photos, if not return a placeholder
  if (!place.photos?.length) {
    return (
      <div className={`w-full h-full bg-gray-300 flex items-center justify-center text-gray-500`}>
        No Image
      </div>
    );
  }

  return (
    <div className="w-32 h-32 relative">
      <Image 
        className={className} 
        src={place.photos[index]} 
        alt={place.title} 
        layout="fill" // This makes the image fill its parent div
        objectFit="cover" // Ensures the image covers the container without distortion
      />
    </div>
  );
}
