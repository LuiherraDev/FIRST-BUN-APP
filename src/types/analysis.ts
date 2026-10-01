export type RiskLevel = 'low' | 'medium' | 'high'

export type ScamAnalysis = {
  message: string
  type: string
  asksForMoney: number
  asksForClick: number
  pressure: number
  risk: RiskLevel
}
