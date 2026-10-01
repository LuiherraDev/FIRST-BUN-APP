import { askLaya, type LayaQuestion } from '../clients/laya.client'
import type { ScamAnalysis, RiskLevel } from '../types/analysis'

const THRESHOLD = 0.8

const SCAM_QUESTIONS: Record<string, LayaQuestion> = {
  type: {
    type: 'choice',
    instructions: '¿Qué tipo de mensaje es?',
    criteria: {
      scam: 'fraude, phishing, piden datos, dinero o hacer clic en un enlace sospechoso',
      advertising: 'ofertas, promociones, marketing legítimo',
      personal: 'conversación normal entre amigos, familia o trabajo',
    },
  },
  asksForMoney: { type: 'noul', instructions: '¿Pide pagar dinero?' },
  asksForClick: { type: 'noul', instructions: '¿Pide hacer clic en un enlace?' },
  pressure: {
    type: 'score',
    instructions: '¿Cuánta prisa o presión mete?',
    criteria: ['ninguna', 'algo de prisa', 'amenaza o urgencia extrema'],
  },
}

const calculateScamRisk = (
  type: string,
  asksForMoney: number,
  asksForClick: number
): RiskLevel => {
  const signals = [type === 'scam', asksForMoney >= THRESHOLD, asksForClick >= THRESHOLD]
  const total = signals.filter(Boolean).length

  if (total >= 2) return 'high'
  if (total === 1) return 'medium'
  return 'low'
}

export const analyzeScam = async (message: string): Promise<ScamAnalysis> => {
  const answers = await askLaya(message, SCAM_QUESTIONS)

  const type = answers.type?.choice ?? 'unknown'
  const asksForMoney = answers.asksForMoney?.noul ?? 0
  const asksForClick = answers.asksForClick?.noul ?? 0
  const pressure = answers.pressure?.score ?? 0

  const analysis: ScamAnalysis = {
    message,
    type,
    asksForMoney,
    asksForClick,
    pressure,
    risk: calculateScamRisk(type, asksForMoney, asksForClick),
  }

  console.log('Análisis de estafa:', analysis)

  return analysis
}
