import { z } from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  LAYA_URL: z.url().default('http://localhost:8000'),
})

export const env = envSchema.parse(process.env)