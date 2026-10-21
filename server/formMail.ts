import nodemailer from 'nodemailer'

const MAX_FIELD_LENGTH = 4000
const MAX_ATTACHMENT_BYTES = 3 * 1024 * 1024

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

type FieldValue = string | boolean

type FormSpec = {
  subject: string
  fields: string[]
  required: string[]
  emailField: string
  attachment?: boolean
}

const FORMS: Record<string, FormSpec> = {
  contact: {
    subject: 'DesCom contact form',
    fields: ['name', 'email', 'phone', 'reason', 'smsConsent', 'message'],
    required: ['name', 'email', 'reason', 'message'],
    emailField: 'email',
  },
  quote: {
    subject: 'DesCom quote request',
    fields: [
      'firstName',
      'lastName',
      'email',
      'phone',
      'address',
      'desiredCoverageAmount',
      'insuranceType',
      'bestTimeToContact',
      'favoriteColor',
    ],
    required: ['firstName', 'lastName', 'email', 'phone', 'insuranceType'],
    emailField: 'email',
  },
  lead: {
    subject: 'DesCom lead inquiry',
    fields: [
      'name',
      'company',
      'email',
      'phone',
      'statesOfInterest',
      'leadType',
      'expectedVolume',
      'smsConsent',
      'message',
    ],
    required: ['name', 'email', 'leadType', 'message'],
    emailField: 'email',
  },
  agent: {
    subject: 'DesCom agency application',
    fields: ['fullName', 'phone', 'email', 'state', 'licensed', 'experience', 'message'],
    required: ['fullName', 'phone', 'email', 'state'],
    emailField: 'email',
  },
  career: {
    subject: 'DesCom career application',
    fields: ['fullName', 'email', 'contactNumber', 'position'],
    required: ['fullName', 'email', 'contactNumber', 'position'],
    emailField: 'email',
    attachment: true,
  },
}

const LABELS: Record<string, string> = {
  name: 'Name',
  fullName: 'Full name',
  firstName: 'First name',
  lastName: 'Last name',
  email: 'Email',
  phone: 'Phone',
  contactNumber: 'Contact number',
  reason: 'Reason',
  message: 'Message',
  smsConsent: 'SMS consent',
  company: 'Company',
  statesOfInterest: 'States of interest',
  leadType: 'Lead type',
  expectedVolume: 'Expected volume',
  address: 'Address',
  desiredCoverageAmount: 'Desired coverage amount',
  insuranceType: 'Insurance type',
  bestTimeToContact: 'Best time to contact',
  favoriteColor: 'Favorite color',
  state: 'State',
  licensed: 'Licensed',
  experience: 'Experience',
  position: 'Position',
}

const ACCEPTED_EXTENSIONS = ['.pdf', '.doc', '.docx', '.png', '.jpg', '.jpeg']

export class FormMailError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export type FormPayload = {
  form?: unknown
  fields?: unknown
  attachment?: unknown
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function readField(value: unknown): FieldValue | null {
  if (typeof value === 'boolean') return value
  if (typeof value === 'string') return value.slice(0, MAX_FIELD_LENGTH)
  return null
}

function displayValue(value: FieldValue) {
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  return value.trim()
}

function safeFilename(filename: string) {
  const base = filename.split(/[/\\]/).pop() ?? 'cv'
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, '_')
  return cleaned.slice(0, 120) || 'cv'
}

function readAttachment(value: unknown, required: boolean) {
  if (value == null) {
    if (required) throw new FormMailError(400, 'Please upload your CV.')
    return null
  }
  if (!isRecord(value)) throw new FormMailError(400, 'The CV upload is invalid.')

  const filename = typeof value.filename === 'string' ? safeFilename(value.filename) : 'cv'
  const contentType = typeof value.contentType === 'string' ? value.contentType : 'application/octet-stream'
  const data = typeof value.data === 'string' ? value.data : ''
  const lower = filename.toLowerCase()
  if (!ACCEPTED_EXTENSIONS.some((ext) => lower.endsWith(ext))) {
    throw new FormMailError(400, 'CV must be a PDF, Word, PNG, or JPG file.')
  }

  const content = Buffer.from(data, 'base64')
  if (content.length === 0 || content.length > MAX_ATTACHMENT_BYTES) {
    throw new FormMailError(400, 'CV must be 3MB or smaller.')
  }

  return { filename, contentType, content }
}

export function buildFormEmail(payload: FormPayload) {
  const formName = typeof payload.form === 'string' ? payload.form : ''
  const spec = FORMS[formName]
  if (!spec) throw new FormMailError(400, 'Unknown form.')
  if (!isRecord(payload.fields)) throw new FormMailError(400, 'Form details are missing.')

  const fields: Record<string, FieldValue> = {}
  for (const key of spec.fields) {
    if (!(key in payload.fields)) continue
    const value = readField(payload.fields[key])
    if (value === null) throw new FormMailError(400, 'A form field is invalid.')
    fields[key] = value
  }

  for (const key of spec.required) {
    const value = fields[key]
    if (typeof value !== 'string' || !value.trim()) {
      throw new FormMailError(400, 'Please fill in all required fields.')
    }
  }

  const replyTo = fields[spec.emailField]
  if (typeof replyTo !== 'string' || !EMAIL_PATTERN.test(replyTo.trim())) {
    throw new FormMailError(400, 'Please enter a valid email address.')
  }

  const lines = spec.fields
    .filter((key) => key in fields)
    .map((key) => `${LABELS[key] ?? key}: ${displayValue(fields[key])}`)

  const attachment = spec.attachment ? readAttachment(payload.attachment, true) : null

  return {
    subject: spec.subject,
    replyTo: replyTo.trim(),
    text: `${lines.join('\n')}\n`,
    attachment,
  }
}

function mailAccount() {
  const user = process.env.SMTP_USER || 'query@descombpo.com'
  const pass = process.env.SMTP_PASS
  if (!pass) {
    throw new FormMailError(500, 'Mail delivery is not configured.')
  }
  const port = Number(process.env.SMTP_PORT || 465)
  return {
    user,
    to: process.env.MAIL_TO || user,
    transporter: nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.descombpo.com',
      port,
      secure: port === 465,
      auth: { user, pass },
    }),
  }
}

export async function sendFormEmail(payload: FormPayload) {
  const message = buildFormEmail(payload)
  const account = mailAccount()
  await account.transporter.sendMail({
    from: account.user,
    to: account.to,
    replyTo: message.replyTo,
    subject: message.subject,
    text: message.text,
    attachments: message.attachment
      ? [
          {
            filename: message.attachment.filename,
            content: message.attachment.content,
            contentType: message.attachment.contentType,
          },
        ]
      : undefined,
  })
}

export async function handleFormPost(method: string | undefined, body: unknown) {
  if (method !== 'POST') {
    return { status: 405, body: { error: 'Method not allowed' } }
  }

  try {
    const payload = typeof body === 'string' ? (JSON.parse(body) as FormPayload) : (body as FormPayload)
    await sendFormEmail(payload)
    return { status: 200, body: { ok: true } }
  } catch (error) {
    if (error instanceof FormMailError) {
      return { status: error.status, body: { error: error.message } }
    }
    console.error('Form mail failed')
    return { status: 500, body: { error: 'Failed to send your message. Please try again later.' } }
  }
}
