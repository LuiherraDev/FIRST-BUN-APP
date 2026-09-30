import { Hono } from 'hono'
import { logger } from 'hono/logger'

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

app.post('/message', async (c) => {
  const body = await c.req.json()

  console.log('Mensaje recibido:', body)

  return c.json({ received: body })
})

export default app