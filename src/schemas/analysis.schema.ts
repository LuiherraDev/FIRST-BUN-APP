import { z } from 'zod'

export const analysisSchema = z.object({
  message: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'El campo "message" es obligatorio'
          : 'El mensaje debe ser un texto',
    })
    .trim()
    .min(5, 'El mensaje debe tener al menos 5 caracteres')
    .max(2000, 'El mensaje no puede superar los 2000 caracteres'),
})

export const idParamSchema = z.object({
  id: z.coerce
    .number('El id debe ser un número')
    .int('El id debe ser un número entero')
    .positive('El id debe ser mayor que 0'),
})