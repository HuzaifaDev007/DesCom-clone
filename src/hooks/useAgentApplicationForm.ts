import { useState, type ChangeEvent, type FormEvent } from 'react'
import {
  emptyAgentApplication,
  validateAgentApplication,
  type AgentApplication,
} from '../lib/agentApplication'

type FormStatus =
  | { type: 'idle' }
  | { type: 'submitting' }
  | { type: 'success'; message: string }
  | { type: 'error'; message: string }

type SubmitHandler = (application: AgentApplication) => Promise<void>

export function useAgentApplicationForm(onSubmit?: SubmitHandler) {
  const [values, setValues] = useState<AgentApplication>(emptyAgentApplication)
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' })

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const error = validateAgentApplication(values)
    if (error) {
      setStatus({ type: 'error', message: error })
      return
    }

    setStatus({ type: 'submitting' })
    try {
      await onSubmit?.(values)
      setValues(emptyAgentApplication)
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

  return { values, status, handleChange, handleSubmit }
}
