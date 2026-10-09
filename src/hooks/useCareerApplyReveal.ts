import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { riseOnEnter } from './sectionReveal'
import { useJoinApplyReveal } from './useJoinApplyReveal'

gsap.registerPlugin(useGSAP)

/**
 * Career apply shares the Join/Contact form motion language (scrubbed
 * watermark kicker, intro rise, stage settle), then adds a soft settle for
 * the file-upload cue — not the inputs themselves, so the form stays usable.
 */
export function useCareerApplyReveal() {
  const { ref } = useJoinApplyReveal()

  useGSAP(
    () => {
      const section = ref.current
      if (!section) return

      const uploadCue = section.querySelector('.career-apply-upload-cue')
      const mm = gsap.matchMedia()

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        if (uploadCue) {
          riseOnEnter(uploadCue, { y: 24, duration: 0.7, start: 'top 92%' })
        }
      })

      return () => {
        mm.revert()
      }
    },
    { scope: ref },
  )

  return { ref }
}
