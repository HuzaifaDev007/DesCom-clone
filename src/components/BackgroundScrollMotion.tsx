import type { CSSProperties, ReactNode, RefObject } from 'react'
import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP, ScrollTrigger)

type BackgroundScrollMotionProps = {
  children: ReactNode
  /** Elementor background translateY speed. 6 matches the reference about photo. */
  speed?: number
  /**
   * Element whose passage through the viewport drives the shift.
   * Elementor measures the motion container's parent. Defaults to this layer's frame.
   */
  triggerRef?: RefObject<HTMLElement | null>
}

/**
 * Elementor background scrolling translateY.
 * The layer is 100% + speed×10 tall and clipped by its frame. Speed 6 is 160%
 * tall, so it can travel 60% of the frame height. Viewport progress 0–100 maps
 * to y = 0 … −travel, which is Elementor's background step:
 * translateY = −movableY × percent / 100.
 */
export function BackgroundScrollMotion({
  children,
  speed = 6,
  triggerRef,
}: BackgroundScrollMotionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const layer = ref.current
      const frame = layer?.parentElement
      if (!layer || !frame) return

      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          layer,
          { y: 0 },
          {
            y: () => -((frame.offsetHeight * speed) / 10),
            ease: 'none',
            overwrite: 'auto',
            scrollTrigger: {
              trigger: triggerRef?.current ?? frame,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        )
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(layer, { y: 0, height: '100%' })
      })

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )

  const style = {
    '--background-scroll-extra': `${speed * 10}%`,
  } as CSSProperties

  return (
    <div ref={ref} className="background-scroll-motion" style={style}>
      {children}
    </div>
  )
}
