import { sql } from '../db/client'
import type { NewScamAnalysis, RiskLevel, ScamAnalysis } from '../types/analysis'

type ScamAnalysisRow = {
  id: number
  message: string
  type: string
  asks_for_money: number
  asks_for_click: number
  pressure: number
  risk: RiskLevel
  created_at: Date
}

const toScamAnalysis = (row: ScamAnalysisRow): ScamAnalysis => ({
  id: row.id,
  message: row.message,
  type: row.type,
  asksForMoney: row.asks_for_money,
  asksForClick: row.asks_for_click,
  pressure: row.pressure,
  risk: row.risk,
  createdAt: row.created_at,
})

export const insertScamAnalysis = async (
  analysis: NewScamAnalysis
): Promise<ScamAnalysis> => {
  const [row] = await sql`
    INSERT INTO scam_analyses (message, type, asks_for_money, asks_for_click, pressure, risk)
    VALUES (
      ${analysis.message},
      ${analysis.type},
      ${analysis.asksForMoney},
      ${analysis.asksForClick},
      ${analysis.pressure},
      ${analysis.risk}
    )
    RETURNING *
  `

  return toScamAnalysis(row)
}

export const findAllScamAnalyses = async (): Promise<ScamAnalysis[]> => {
  const rows = await sql`
    SELECT * FROM scam_analyses
    ORDER BY created_at DESC
    LIMIT 10
  `

  return rows.map(toScamAnalysis)
}

export const findScamAnalysisById = async (id: number): Promise<ScamAnalysis | null> => {
  const [row] = await sql`
    SELECT * FROM scam_analyses
    WHERE id = ${id}
  `

  return row ? toScamAnalysis(row) : null
}