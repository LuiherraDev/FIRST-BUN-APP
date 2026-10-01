import { createFactory } from 'hono/factory'
import { zValidator } from '@hono/zod-validator'
import { analysisSchema, idParamSchema } from '../schemas/analysis.schema'
import { analyzeScam, getScamAnalysis, listScamAnalyses } from '../services/analysis.service'
import { validationHook } from '../middlewares/validator'

const factory = createFactory()

export const analyzeScamController = factory.createHandlers(
  zValidator('json', analysisSchema, validationHook),
  async (context) => {
    const { message } = context.req.valid('json')

    const result = await analyzeScam(message)

    return context.json(result, 201)
  }
)

export const listScamAnalysesController = factory.createHandlers(async (context) => {
  const analyses = await listScamAnalyses()

  return context.json(analyses)
})

export const getScamAnalysisController = factory.createHandlers(
  zValidator('param', idParamSchema, validationHook),
  async (context) => {
    const { id } = context.req.valid('param')

    const analysis = await getScamAnalysis(id)

    return context.json(analysis)
  }
)