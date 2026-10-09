import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  emptyCareerApplication,
  validateCareerApplication,
  type CareerApplication,
  type CareerFieldErrors,
} from '../lib/careerApplication'

type FormStatus =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

type SubmitHandler = (application: CareerApplication) => Promise<void>

export function useCareerApplicationForm(onSubmit?: SubmitHandler) {
  const [values, setValues] = useState<CareerApplication>(emptyCareerApplication)
  const [errors, setErrors] = useState<CareerFieldErrors>({})
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const clearFieldError = (name: keyof CareerApplication) => {
    setErrors((current) => {
      if (!current[name]) return current
      const next = { ...current }
      delete next[name]
      return next
    })
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target
    const field = name as keyof CareerApplication

    if (event.target instanceof HTMLInputElement && event.target.type === 'file') {
      const file = event.target.files?.[0] ?? null
      setValues((current) => ({ ...current, cv: file }))
      clearFieldError('cv')
      if (status.type === 'error' || status.type === 'success') {
        setStatus({ type: 'idle' })
      }
      return
    }

    setValues((current) => ({ ...current, [field]: value }))
    clearFieldError(field)
    if (status.type === 'error' || status.type === 'success') {
      setStatus({ type: 'idle' })
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const nextErrors = validateCareerApplication(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      setStatus({
        type: 'error',
        message: 'Please fix the highlighted fields and try again.',
      })
      return
    }

    setErrors({})
    setStatus({ type: 'submitting' })
    try {
      await onSubmit?.(values)
      setValues(emptyCareerApplication)
      const form = event.currentTarget
      form.reset()
      setStatus({
        type: 'success',
        message: 'Application submitted successfully! We will be in touch soon.',
      })
    } catch {
      setStatus({
        type: 'error',
        message: 'Failed to submit application. Please try again later.',
      })
    }
  }

  return { values, errors, status, handleChange, handleSubmit }
}
