/**
 * Force a fully static page for full-page screenshots.
 *
 * Open any route with `?static=1` (or `?screenshot=1`). That:
 * - makes GSAP / matchMedia treat the page as prefers-reduced-motion
 * - disables ScrollSmoother (normal document scroll)
 * - marks <html> so CSS can kill transitions / pause media
 *
 * Remove the query param and reload to restore animations.
 */
export function enableStaticScreenshotMode(): boolean {
  const params = new URLSearchParams(window.location.search)
  const flag = params.get('static') ?? params.get('screenshot')
  if (flag == null || flag === '0' || flag === 'false') return false

  document.documentElement.classList.add('static-screenshot')
  document.documentElement.dataset.staticScreenshot = 'true'

  const originalMatchMedia = window.matchMedia.bind(window)

  window.matchMedia = ((query: string) => {
    const rewritten = query
      .replace(/\(prefers-reduced-motion:\s*no-preference\)/gi, '(max-width: -1px)')
      .replace(/\(prefers-reduced-motion:\s*reduce\)/gi, '(min-width: 0px)')

    return originalMatchMedia(rewritten)
  }) as typeof window.matchMedia

  const freezeMedia = () => {
    document.querySelectorAll<HTMLMediaElement>('video, audio').forEach((media) => {
      media.autoplay = false
      media.loop = false
      media.pause()
      media.currentTime = 0
    })
  }

  freezeMedia()
  document.addEventListener('DOMContentLoaded', freezeMedia)
  window.addEventListener('load', freezeMedia)

  const observer = new MutationObserver(freezeMedia)
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  })

  return true
}

export function isStaticScreenshotMode(): boolean {
  return document.documentElement.classList.contains('static-screenshot')
}
