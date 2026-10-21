import { handleFormPost } from '../server/formMail.js'

type ApiRequest = {
  method?: string
  body?: unknown
}

type ApiResponse = {
  status: (code: number) => {
    json: (body: unknown) => void
  }
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  const result = await handleFormPost(req.method, req.body)
  res.status(result.status).json(result.body)
}
