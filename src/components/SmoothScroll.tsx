import type { ReactNode } from 'react'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

type SmoothScrollProps = {
  children: ReactNode
}

export function SmoothScroll({ children }: SmoothScrollProps) {
  const { wrapperRef, contentRef } = useSmoothScroll()

  return (
    <div ref={wrapperRef} id="smooth-wrapper">
      <div ref={contentRef} id="smooth-content">
        {children}
      </div>
    </div>
  )
}
