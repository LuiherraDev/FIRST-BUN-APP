import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { env } from './config/env'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'
import { errorHandler } from './middlewares/error-handler'
import { routes } from './routes'

const messageSchema = z.object({
  message: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? 'El campo "message" es obligatorio'
          : 'El mensaje debe ser un texto',
    })
    .min(1, 'El mensaje no puede estar vacío')
    .max(20, 'El mensaje no puede superar los 20 caracteres'),
})

const app = new Hono()
app.use(logger())
app.use(cors({ origin: env.CORS_ORIGIN }))
app.onError(errorHandler)
app.notFound((context) => context.json({ error: 'Ruta no encontrada' }, 404))

const users = [
  { id: 1, name: 'Ger' },
  { id: 2, name: 'Luis' },
  { id: 3, name: 'Marta' },
]

app.get('/', (context) => context.text('Hola desde Hono!'))
app.get('/users', (context) => context.json(users))
app.get('/users/:id', (context) => {
  const id = Number(context.req.param('id'))
  const user = users.find((user) => user.id === id)

  if (!user) {
    return context.json({ error: 'Usuario no encontrado' }, 404)
  }

  return context.json(user)
})

app.post(
  '/message',
  zValidator('json', messageSchema, (result, context) => {
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message,
      }))

      return context.json({ errors }, 400)
    }
  }),
  (context) => {
    const body = context.req.valid('json')

    console.log('Mensaje recibido:', body)

    return context.json({ received: body })
  }
)
app.route('/', routes)
export default app