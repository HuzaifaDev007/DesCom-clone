import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  emptyLeadInquiry,
  validateLeadInquiry,
  type LeadInquiry,
} from '../lib/leadInquiry'

type FormStatus =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

type SubmitHandler = (inquiry: LeadInquiry) => Promise<void>

export function useLeadInquiryForm(onSubmit?: SubmitHandler) {
  const [values, setValues] = useState<LeadInquiry>(emptyLeadInquiry)
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    const nextValue =
      event.target instanceof HTMLInputElement && event.target.type === 'checkbox'
        ? event.target.checked
        : value
    setValues((current) => ({ ...current, [name]: nextValue }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const error = validateLeadInquiry(values)
    if (error) {
      setStatus({ type: 'error', message: error })
      return
    }

    setStatus({ type: 'submitting' })
    try {
      await onSubmit?.(values)
      setValues(emptyLeadInquiry)
      setStatus({
        type: 'success',
        message: 'Thank you! We will follow up to talk through availability and next steps.',
      })
    } catch {
      setStatus({
        type: 'error',
        message: 'Failed to send your inquiry. Please try again later.',
      })
    }
  }

  return { values, status, handleChange, handleSubmit }
}
