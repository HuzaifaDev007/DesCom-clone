import { useRef } from 'react'
import { useLocation } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother)

const MOBILE_NAV = '(max-width: 1024px)'

export function useSmoothScroll() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { pathname } = useLocation()

  useGSAP(
    () => {
      const wrapper = wrapperRef.current
      const content = contentRef.current
      if (!wrapper || !content) return

      const motion = gsap.matchMedia()

      motion.add('(prefers-reduced-motion: no-preference)', () => {
        const navbar = wrapper.querySelector<HTMLElement>('.navbar')
        const mobileNav = window.matchMedia(MOBILE_NAV)
        let setNavbarY: ReturnType<typeof gsap.quickSetter> | null = null
        let holdingFixed = false

        const releaseNavbar = () => {
          if (!navbar || !holdingFixed) return
          gsap.set(navbar, { y: 0, clearProps: 'transform' })
          holdingFixed = false
          setNavbarY = null
        }

        // ScrollSmoother moves #smooth-content with a transform, so position:fixed
        // inside it scrolls away. Cancel that shift while the nav is fixed.
        const holdNavbar = (scroll: number) => {
          if (!navbar || !mobileNav.matches) {
            releaseNavbar()
            return
          }

          setNavbarY ??= gsap.quickSetter(navbar, 'y', 'px')
          setNavbarY(scroll)
          holdingFixed = true
        }

        const smoother = ScrollSmoother.create({
          wrapper,
          content,
          smooth: 1,
          smoothTouch: 0.1,
          effects: false,
          ignoreMobileResize: true,
          onUpdate: (self) => {
            holdNavbar(self.scrollTop())
          },
        })

        const onNavMode = () => {
          holdNavbar(smoother.scrollTop())
        }

        const onAnchorClick = (event: MouseEvent) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return
          }

          const link = (event.target as Element | null)?.closest('a[href^="#"]')
          if (!link || !wrapper.contains(link)) return

          const hash = link.getAttribute('href')
          if (!hash || hash === '#') return

          const target = content.querySelector(hash)
          if (!target) return

          event.preventDefault()
          smoother.scrollTo(target, true, 'top 96px')
        }

        mobileNav.addEventListener('change', onNavMode)
        wrapper.addEventListener('click', onAnchorClick)
        ScrollTrigger.refresh()

        return () => {
          mobileNav.removeEventListener('change', onNavMode)
          wrapper.removeEventListener('click', onAnchorClick)
          releaseNavbar()
          smoother.kill()
        }
      })

      return () => {
        motion.revert()
      }
    },
    { scope: wrapperRef },
  )

  useGSAP(
    () => {
      const smoother = ScrollSmoother.get()

      if (smoother) {
        smoother.scrollTo(0, false)
        // Delay past page-hook setup. Refreshing while nested contexts are
        // still wiring up overflows Context.getTweens on SPA navigations.
        const refresh = gsap.delayedCall(0.05, () => {
          ScrollTrigger.refresh()
        })
        return () => {
          refresh.kill()
        }
      }

      window.scrollTo(0, 0)
    },
    { scope: wrapperRef, dependencies: [pathname] },
  )

  return { wrapperRef, contentRef }
}
