/**
 * Non-UI helper: normalize a label for display.
 * Keep business/formatting logic here — not inside components.
 */
export function formatLabel(value: string | null | undefined): string {
  if (value == null) return ''
  return String(value)
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}
