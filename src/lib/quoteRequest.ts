export const INSURANCE_TYPES = [
  'Life Insurance',
  'Health Insurance',
  'Home Insurance',
  'Auto Insurance',
  'Business Insurance',
] as const

export const CONTACT_TIMES = ['Morning', 'Afternoon', 'Evening'] as const

export type QuoteRequest = {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  desiredCoverageAmount: string
  insuranceType: string
  bestTimeToContact: string
  favoriteColor: string
}

export const emptyQuoteRequest: QuoteRequest = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  desiredCoverageAmount: '',
  insuranceType: '',
  bestTimeToContact: '',
  favoriteColor: '#0f172a',
}

export function validateQuoteRequest(request: QuoteRequest): string | null {
  const { firstName, lastName, email, phone, insuranceType } = request
  if (
    !firstName.trim() ||
    !lastName.trim() ||
    !email.trim() ||
    !phone.trim() ||
    !insuranceType
  ) {
    return 'Please fill in all required fields.'
  }
  return null
}
