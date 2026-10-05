export const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
  'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
  'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY',
] as const

export type AgentApplication = {
  fullName: string
  phone: string
  email: string
  state: string
  licensed: 'yes' | 'no'
  experience: string
  message: string
}

export const emptyAgentApplication: AgentApplication = {
  fullName: '',
  phone: '',
  email: '',
  state: '',
  licensed: 'yes',
  experience: '',
  message: '',
}

export function validateAgentApplication(application: AgentApplication): string | null {
  const { fullName, phone, email, state } = application
  if (!fullName.trim() || !phone.trim() || !email.trim() || !state) {
    return 'Please fill in all required fields.'
  }
  return null
}
