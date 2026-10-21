export type InquiryForm = 'contact' | 'quote' | 'lead' | 'agent' | 'career'

type InquiryFields = Record<string, string | boolean | File | null | undefined>

type InquiryAttachment = {
  filename: string
  contentType: string
  data: string
}

function fileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : ''
      const comma = result.indexOf(',')
      resolve(comma >= 0 ? result.slice(comma + 1) : result)
    }
    reader.onerror = () => reject(new Error('Could not read the uploaded file.'))
    reader.readAsDataURL(file)
  })
}

export async function submitInquiry(form: InquiryForm, fields: InquiryFields) {
  const plain: Record<string, string | boolean> = {}
  let attachment: InquiryAttachment | undefined

  for (const [key, value] of Object.entries(fields)) {
    if (value instanceof File) {
      attachment = {
        filename: value.name,
        contentType: value.type || 'application/octet-stream',
        data: await fileToBase64(value),
      }
      continue
    }
    if (typeof value === 'string' || typeof value === 'boolean') {
      plain[key] = value
    }
  }

  const response = await fetch('/api/send-form', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ form, fields: plain, attachment }),
  })

  if (!response.ok) {
    const payload = (await response.json().catch(() => null)) as { error?: string } | null
    throw new Error(payload?.error || 'Failed to send your message. Please try again later.')
  }
}
