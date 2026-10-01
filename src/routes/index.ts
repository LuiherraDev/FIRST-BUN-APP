import { Hono } from 'hono'
import { analysisRoutes } from './analysis.routes'

export const routes = new Hono()

routes.route('/analysis', analysisRoutes)