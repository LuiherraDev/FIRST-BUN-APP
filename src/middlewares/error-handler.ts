import type { ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'

export const errorHandler: ErrorHandler = (error, context) => {
  if (error instanceof HTTPException) {
    return context.json({ error: error.message }, error.status)
  }

  console.error(error)
  return context.json({ error: 'Error interno del servidor' }, 500)
}
