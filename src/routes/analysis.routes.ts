import { Hono } from 'hono'
import {
  analyzeScamController,
  getScamAnalysisController,
  listScamAnalysesController,
} from '../controllers/analysis.controller'

export const analysisRoutes = new Hono()

analysisRoutes.post('/scam', ...analyzeScamController)
analysisRoutes.get('/scam', ...listScamAnalysesController)
analysisRoutes.get('/scam/:id', ...getScamAnalysisController)