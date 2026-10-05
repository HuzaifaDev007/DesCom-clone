import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  emptyContactInquiry,
  validateContactInquiry,
  type ContactInquiry,
} from '../lib/contactInquiry'

type FormStatus =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

type SubmitHandler = (inquiry: ContactInquiry) => Promise<void>

export function useContactForm(onSubmit?: SubmitHandler) {
  const [values, setValues] = useState<ContactInquiry>(emptyContactInquiry)
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

    const error = validateContactInquiry(values)
    if (error) {
      setStatus({ type: 'error', message: error })
      return
    }

    setStatus({ type: 'submitting' })
    try {
      await onSubmit?.(values)
      setValues(emptyContactInquiry)
      setStatus({
        type: 'success',
        message: 'Thank you! Our team will get back to you shortly.',
      })
    } catch {
      setStatus({
        type: 'error',
        message: 'Failed to send your message. Please try again later.',
      })
    }
  }

  return { values, status, handleChange, handleSubmit }
}
