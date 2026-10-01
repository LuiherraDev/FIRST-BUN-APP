import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  CORS_ORIGIN: z.url().default('http://localhost:3001'),
  LAYA_URL: z.url().default('http://localhost:8000'),
  DATABASE_URL: z.url(),
})

export const env = envSchema.parse(process.env)