export const LEAD_TYPES = [
  'ACA Marketplace Plans',
  'Medicaid',
  'Health Insurance (Other)',
  'Final Expense Life Insurance',
  'Multiple / Not Sure',
] as const

export type LeadInquiry = {
  name: string
  company: string
  email: string
  phone: string
  statesOfInterest: string
  leadType: string
  expectedVolume: string
  smsConsent: boolean
  message: string
}

export const emptyLeadInquiry: LeadInquiry = {
  name: '',
  company: '',
  email: '',
  phone: '',
  statesOfInterest: '',
  leadType: '',
  expectedVolume: '',
  smsConsent: false,
  message: '',
}

export function validateLeadInquiry(inquiry: LeadInquiry): string | null {
  const { name, email, leadType, message } = inquiry
  if (!name.trim() || !email.trim() || !leadType || !message.trim()) {
    return 'Please fill in all required fields.'
  }
  return null
}
