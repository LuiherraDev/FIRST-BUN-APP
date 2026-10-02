import { Hono } from 'hono'
import { analysisRoutes } from './analysis.routes'

export const routes = new Hono()

routes.get('/health', (context) => context.json({ status: 'ok' }))
routes.route('/analysis', analysisRoutes)