import type { Context } from 'hono'

type ValidationResult = {
  success: boolean
  error?: { issues: { path: PropertyKey[]; message: string }[] }
}

export const validationHook = (result: ValidationResult, context: Context) => {
  if (!result.success && result.error) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }))

    return context.json({ errors }, 400)
  }
}