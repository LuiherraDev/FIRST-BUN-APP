import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { env } from './config/env'
import { errorHandler } from './middlewares/error-handler'
import { routes } from './routes'

const app = new Hono()

app.use(logger())
app.use(cors({ origin: env.CORS_ORIGIN }))
app.onError(errorHandler)
app.notFound((context) => context.json({ error: 'Ruta no encontrada' }, 404))

app.route('/', routes)

export default app