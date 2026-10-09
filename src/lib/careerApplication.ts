export const CAREER_POSITIONS = [
  'Insurance Agent',
  'Sales Representative',
  'Customer Support',
  'Operations',
  'Marketing',
  'Other',
] as const

export type CareerApplication = {
  fullName: string
  email: string
  contactNumber: string
  position: string
  cv: File | null
}

export type CareerFieldErrors = Partial<
  Record<keyof CareerApplication, string>
>

export const emptyCareerApplication: CareerApplication = {
  fullName: '',
  email: '',
  contactNumber: '',
  position: '',
  cv: null,
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_PATTERN = /^[\d\s()+.-]{7,20}$/
const ACCEPTED_CV_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/png',
  'image/jpeg',
]
const ACCEPTED_CV_EXTENSIONS = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg']
const MAX_CV_BYTES = 5 * 1024 * 1024

function hasAcceptedCvExtension(fileName: string) {
  const lower = fileName.toLowerCase()
  return ACCEPTED_CV_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

export function isAcceptedCvFile(file: File) {
  if (ACCEPTED_CV_TYPES.includes(file.type)) return true
  return hasAcceptedCvExtension(file.name)
}

export function validateCareerApplication(
  application: CareerApplication,
): CareerFieldErrors {
  const errors: CareerFieldErrors = {}
  const { fullName, email, contactNumber, position, cv } = application

  if (!fullName.trim()) {
    errors.fullName = 'Please enter your full name.'
  } else if (fullName.trim().length < 2) {
    errors.fullName = 'Full name must be at least 2 characters.'
  }

  if (!email.trim()) {
    errors.email = 'Please enter your email address.'
  } else if (!EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Please enter a valid email address.'
  }

  if (!contactNumber.trim()) {
    errors.contactNumber = 'Please enter your contact number.'
  } else if (!PHONE_PATTERN.test(contactNumber.trim())) {
    errors.contactNumber = 'Please enter a valid contact number.'
  }

  if (!position) {
    errors.position = 'Please select the position you are applying for.'
  }

  if (!cv) {
    errors.cv = 'Please upload your CV.'
  } else if (!isAcceptedCvFile(cv)) {
    errors.cv = 'CV must be a PDF, Word, PNG, or JPG file.'
  } else if (cv.size > MAX_CV_BYTES) {
    errors.cv = 'CV must be 5MB or smaller.'
  }

  return errors
}
