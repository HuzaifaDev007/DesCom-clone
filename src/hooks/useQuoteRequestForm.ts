import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  emptyQuoteRequest,
  validateQuoteRequest,
  type QuoteRequest,
} from '../lib/quoteRequest'

type FormStatus =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

type SubmitHandler = (request: QuoteRequest) => Promise<void>

export function useQuoteRequestForm(onSubmit?: SubmitHandler) {
  const [values, setValues] = useState<QuoteRequest>(emptyQuoteRequest)
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const error = validateQuoteRequest(values)
    if (error) {
      setStatus({ type: 'error', message: error })
      return
    }

    setStatus({ type: 'submitting' })
    try {
      await onSubmit?.(values)
      setValues(emptyQuoteRequest)
      setStatus({
        type: 'success',
        message: 'Quote request submitted successfully. We will contact you soon.',
      })
    } catch {
      setStatus({
        type: 'error',
        message: 'Failed to submit quote request. Please try again.',
      })
    }
  }

  return { values, status, handleChange, handleSubmit }
}
