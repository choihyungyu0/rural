import { useState, type ReactNode } from 'react'

type ImageWithFallbackProps = {
  src: string
  alt: string
  className?: string
  fallbackClassName?: string
  fallbackLabel: string
  fallback?: ReactNode
}

export function ImageWithFallback({
  src,
  alt,
  className = '',
  fallbackClassName = '',
  fallbackLabel,
  fallback,
}: ImageWithFallbackProps) {
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
