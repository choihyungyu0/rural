import { useState, type ReactNode } from 'react'

type LocalImageProps = {
  src: string
  alt: string
  className?: string
  fallbackClassName?: string
  fallbackLabel: string
  fallback?: ReactNode
}

export function LocalImage({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  fallbackLabel,
  fallback,
}: LocalImageProps) {
  const [hasError, setHasError] = useState(false)

  if (hasError) {
    return (
      <div
        className={`imageFallback ${className} ${fallbackClassName}`}
        role="img"
        aria-label={alt}
      >
        {fallback ?? <span>{fallbackLabel}</span>}
      </div>
    )
  }

  return <img src={src} alt={alt} className={className} onError={() => setHasError(true)} />
}
