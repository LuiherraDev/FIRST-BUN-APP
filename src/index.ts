import app from './app'
import { env } from './config/env'
import { initDatabase } from './db/client'

await initDatabase()

export default {
  port: env.PORT,
  fetch: app.fetch,
}