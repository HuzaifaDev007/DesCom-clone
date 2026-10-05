import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP)

export function useNavbarMenu(open: boolean) {
  const rootRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const openRef = useRef(open)

  useEffect(() => {
    openRef.current = open
  }, [open])

  useGSAP(
    () => {
      const motion = gsap.matchMedia()

      motion.add('(max-width: 1024px)', () => {
        const root = rootRef.current
        if (!root) return

        const panel = root.querySelector<HTMLElement>('.navbar-menu')
        const items = root.querySelectorAll<HTMLElement>('.navbar-menu-item')
        if (!panel) return

        const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        gsap.killTweensOf([panel, items])

        // Force horizontal-only motion; clear any leftover top/bottom tweens.
        gsap.set(panel, {
          x: 0,
          y: 0,
          yPercent: 0,
          xPercent: -100,
          autoAlpha: 0,
        })
        gsap.set(items, { x: -20, y: 0, autoAlpha: 0 })

        const menu = gsap.timeline({
          paused: true,
          defaults: { overwrite: 'auto' },
        })

        menu.fromTo(
          panel,
          { xPercent: -100, yPercent: 0, y: 0, autoAlpha: 0 },
          {
            xPercent: 0,
            yPercent: 0,
            y: 0,
            autoAlpha: 1,
            duration: reduce ? 0 : 0.45,
            ease: 'power3.out',
          },
        )

        menu.to(
          items,
          {
            x: 0,
            autoAlpha: 1,
            stagger: reduce ? 0 : 0.04,
            duration: reduce ? 0 : 0.3,
            ease: 'power2.out',
          },
          reduce ? 0 : 0.1,
        )

        menu.eventCallback('onReverseComplete', () => {
          gsap.set(panel, {
            xPercent: -100,
            yPercent: 0,
            y: 0,
            autoAlpha: 0,
          })
        })

        timelineRef.current = menu

        if (openRef.current) {
          menu.progress(1)
        }

        return () => {
          gsap.killTweensOf([panel, items])
          timelineRef.current = null
        }
      })

      return () => {
        motion.revert()
      }
    },
    { scope: rootRef },
  )

  useGSAP(
    () => {
      const menu = timelineRef.current
      if (!menu) return

      if (open) {
        menu.play()
        return
      }

      menu.reverse()
    },
    { scope: rootRef, dependencies: [open] },
  )

  return rootRef
}
