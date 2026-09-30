import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { z } from 'zod'
import { zValidator } from '@hono/zod-validator'

const messageSchema = z.object({
  message: z.string().min(1).max(20),
})

const app = new Hono()
app.use(logger())

const users = [
  { id: 1, name: 'Ger' },
  { id: 2, name: 'Luis' },
  { id: 3, name: 'Marta' },
]

app.get('/', (c) => c.text('Hola desde Hono!'))
app.get('/users', (c) => c.json(users))
app.get('/users/:id', (c) => {
  const id = Number(c.req.param('id'))
  const user = users.find((u) => u.id === id)

  if (!user) {
    return c.json({ error: 'Usuario no encontrado' }, 404)
  }

  return c.json(user)
})

app.post('/message', zValidator('json', messageSchema), (c) => {
  const body = c.req.valid('json')

  console.log('Mensaje recibido:', body)

  return c.json({ received: body })
})

//Esto sería sin usar zValidator de '@hono/zod-validator' (una dependencia que hace de enchufe, la doc. de hono la recomienda)
/* app.post('/message', async (c) => {
  const data = await c.req.json()
  const result = messageSchema.safeParse(data)

  if (!result.success) {
    return c.json({ error: 'Datos no válidos' }, 400)
  }

  console.log('Mensaje recibido:', result.data)
  return c.json({ received: result.data })
}) */

export default app