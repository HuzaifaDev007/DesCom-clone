import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { formApiPlugin } from './server/devFormApi.ts'

// Serves /api/send-form during `npm run dev`. Production uses api/send-form.ts.

export default defineConfig({
  plugins: [formApiPlugin(), react(), tailwindcss()],
})

