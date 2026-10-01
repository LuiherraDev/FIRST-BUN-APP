export type RiskLevel = 'low' | 'medium' | 'high'

export type NewScamAnalysis = {
  message: string
  type: string
  asksForMoney: number
  asksForClick: number
  pressure: number
  risk: RiskLevel
}

export type ScamAnalysis = NewScamAnalysis & {
  id: number
  createdAt: Date
}