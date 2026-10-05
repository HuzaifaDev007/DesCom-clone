export const CONTACT_REASONS = [
  'Question About Our Services',
  'Request a Quote',
  'Existing Policy Assistance',
  'Other',
] as const

export type ContactInquiry = {
  name: string
  email: string
  phone: string
  reason: string
  smsConsent: boolean
  message: string
}

export const emptyContactInquiry: ContactInquiry = {
  name: '',
  email: '',
  phone: '',
  reason: '',
  smsConsent: false,
  message: '',
}

export function validateContactInquiry(inquiry: ContactInquiry): string | null {
  const { name, email, reason, message } = inquiry
  if (!name.trim() || !email.trim() || !reason || !message.trim()) {
    return 'Please fill in all required fields.'
  }
  return null
}
