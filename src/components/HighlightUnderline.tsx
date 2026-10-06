import type { ReactNode } from 'react'
import { useHighlightUnderline } from '../hooks/useHighlightUnderline'

const HIGHLIGHT_PATH =
  'M9.3,127.3c49.3-3,150.7-7.6,199.7-7.4c121.9,0.4,189.9,0.4,282.3,7.2C380.1,129.6,181.2,130.6,70,139c82.6-2.9,254.2-1,335.9,1.3c-56,1.4-137.2-0.3-197.1,9'

type HighlightUnderlineProps = {
  children: ReactNode
  className?: string
}

export function HighlightUnderline({
  children,
  className,
}: HighlightUnderlineProps) {
  const { ref } = useHighlightUnderline()
  const classes = className
    ? `highlight-underline ${className}`
    : 'highlight-underline'

  return (
    <span ref={ref} className={classes}>
      {children}
      <svg
        className="highlight-underline-mark"
        viewBox="0 0 500 150"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path className="highlight-underline-path" d={HIGHLIGHT_PATH} />
      </svg>
    </span>
  )
}
