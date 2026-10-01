import { z } from 'zod'
import { HTTPException } from 'hono/http-exception'
import { env } from '../config/env'

export type LayaQuestion =
  | { type: 'noul'; instructions: string }
  | { type: 'choice'; instructions: string; criteria: Record<string, string> }
  | { type: 'score'; instructions: string; criteria: string[] }

const answerSchema = z.object({
  type: z.enum(['noul', 'choice', 'score']),
  noul: z.number().optional(),
  choice: z.string().optional(),
  score: z.number().optional(),
  confidence: z.number(),
})

const layaResponseSchema = z.object({
  answers: z.record(z.string(), answerSchema),
})

export const askLaya = async (
  message: string,
  questions: Record<string, LayaQuestion>
) => {
  const response = await fetch(`${env.LAYA_URL}/v1/systemone`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'multilingual', state: { message }, questions }),
  }).catch(() => {
    throw new HTTPException(503, { message: 'El servicio de IA no está disponible' })
  })

  if (!response.ok) {
    throw new HTTPException(502, { message: 'El servicio de IA respondió con un error' })
  }

  const data = layaResponseSchema.parse(await response.json())

  return data.answers
}