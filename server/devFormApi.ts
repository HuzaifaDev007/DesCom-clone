import type { IncomingMessage, ServerResponse } from 'node:http'
import { loadEnv, type Plugin } from 'vite'
import { FormMailError, handleFormPost } from './formMail.ts'

const MAIL_ENV_KEYS = ['SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASS', 'MAIL_TO'] as const

const MAX_BODY_BYTES = 5 * 1024 * 1024

function readBody(req: IncomingMessage) {
  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = []
    let size = 0
    req.on('data', (chunk: Buffer) => {
      size += chunk.length
      if (size > MAX_BODY_BYTES) {
        reject(new FormMailError(413, 'Submission is too large.'))
        req.destroy()
        return
      }
      chunks.push(chunk)
    })
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

export function formApiPlugin(): Plugin {
  return {
    name: 'form-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, server.config.envDir, '')
      for (const key of MAIL_ENV_KEYS) {
        if (env[key]) process.env[key] = env[key]
      }

      server.middlewares.use('/api/send-form', (req, res, next) => {
        if (req.method === 'GET' || req.method === 'HEAD') {
          next()
          return
        }
        void respond(req, res)
      })
    },
  }
}

async function respond(req: IncomingMessage, res: ServerResponse) {
  try {
    const raw = await readBody(req)
    const result = await handleFormPost(req.method, raw ? JSON.parse(raw) : {})
    res.statusCode = result.status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify(result.body))
  } catch (error) {
    const status = error instanceof FormMailError ? error.status : 400
    const message = error instanceof FormMailError ? error.message : 'The form submission could not be read.'
    res.statusCode = status
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ error: message }))
  }
}
