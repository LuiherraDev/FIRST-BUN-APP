import { createFactory } from 'hono/factory'
import { zValidator } from '@hono/zod-validator'
import { analysisSchema } from '../schemas/analysis.schema'
import { validationHook } from '../middlewares/validator'
import { analyzeScam } from '../services/analysis.service'

const factory = createFactory()

export const analyzeScamController = factory.createHandlers(
  zValidator('json', analysisSchema, validationHook),
  async (context) => {
    const { message } = context.req.valid('json')

    const result = await analyzeScam(message)

    return context.json(result)
  }
)
