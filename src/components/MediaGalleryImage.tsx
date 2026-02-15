'use client';

import { useState } from 'react';

type MediaGalleryImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

const FALLBACK_IMAGE = '/images/logo-complet-tchad.jpg';

export default function MediaGalleryImage({ src, alt, className }: MediaGalleryImageProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK_IMAGE);

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setImageSrc(FALLBACK_IMAGE)}
    />
  );
}
