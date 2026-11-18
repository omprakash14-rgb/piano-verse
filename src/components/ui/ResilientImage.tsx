import { useState } from 'react';
import { Music2 } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface ResilientImageProps {
  src?: string;
  alt: string;
  title?: string;
  className?: string;
  aspectClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  title,
  className,
  aspectClassName = 'aspect-[4/3]',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(!src);

  if (!src || failed) {
    return (
      <div
        className={cn(
          'relative flex flex-col items-center justify-center overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-subtle)] p-6 text-center',
          aspectClassName,
          className
        )}
        role="img"
        aria-label={alt}
      >
        <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--accent-gold)]">
          <Music2 className="h-5 w-5" />
        </div>
        <p className="font-display text-lg font-semibold text-[var(--text-primary)]">
          {title || alt}
        </p>
        <p className="mt-1 text-xs text-[var(--text-secondary)]">PianoVerse Conservatory Archive</p>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden rounded-lg bg-[var(--bg-subtle)]', aspectClassName, className)}>
      <img
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onError={() => setFailed(true)}
        className="h-full w-full object-cover transition-transform duration-300"
      />
    </div>
  );
}
