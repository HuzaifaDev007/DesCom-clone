import { Button } from '../components/Button'
import { formatLabel } from '../lib/formatLabel'

export function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl space-y-6 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
        {formatLabel('about this starter')}
      </h1>
      <p className="max-w-lg text-zinc-600">
        This page owns the route. Reusable pieces like Button live in
        components/. Formatting logic lives in lib/.
      </p>
      <Button variant="secondary" type="button">
        Sample button
      </Button>
    </main>
  )
}
