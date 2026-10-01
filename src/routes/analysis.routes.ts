import { Hono } from 'hono'
import { analyzeScamController } from '../controllers/analysis.controller'

export const analysisRoutes = new Hono()

analysisRoutes.post('/scam', ...analyzeScamController)
