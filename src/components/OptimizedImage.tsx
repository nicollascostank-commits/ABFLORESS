import React from 'react';
import { IMAGE_VARIANTS } from '../data/imageVariants';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
  variant?: 'responsive' | 'thumb' | 'lightbox';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  sizes = '(max-width: 640px) 48vw, (max-width: 1024px) 46vw, 380px',
  loading = 'lazy',
  decoding = 'async',
  fetchPriority,
  referrerPolicy = 'no-referrer',
  onLoad,
  variant = 'responsive',
}) => {
  const meta = IMAGE_VARIANTS[src];

  let webpSrcSet: string | undefined;

  if (meta) {
    if (variant === 'thumb') {
      webpSrcSet = meta.w480 || meta.full;
    } else if (variant === 'lightbox') {
      if (meta.full) {
        const candidates = [
          meta.w480 ? `${meta.w480} 480w` : null,
          meta.w900 ? `${meta.w900} 900w` : null,
          `${meta.full} ${meta.w}w`,
        ].filter(Boolean) as string[];
        webpSrcSet = candidates.join(', ');
      }
    } else {
      const candidates = [
        meta.w480 ? `${meta.w480} 480w` : null,
        meta.w900 ? `${meta.w900} 900w` : null,
        meta.full ? `${meta.full} ${meta.w}w` : null,
      ].filter(Boolean) as string[];
      if (candidates.length > 0) {
        webpSrcSet = candidates.join(', ');
      }
    }
  }

  return (
    <picture className="contents">
      {webpSrcSet && (
        <source
          type="image/webp"
          srcSet={webpSrcSet}
          sizes={variant === 'thumb' ? undefined : sizes}
        />
      )}
      <img
        src={src}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        referrerPolicy={referrerPolicy}
        onLoad={onLoad}
      />
    </picture>
  );
};
