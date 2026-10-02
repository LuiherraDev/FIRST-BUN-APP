import { describe, expect, test } from 'bun:test'
import { calculateScamRisk } from './analysis.service'

describe('calculateScamRisk', () => {
  test('returns high when two or more signals are present', () => {
    expect(calculateScamRisk('scam', 0.9, 0.1)).toBe('high')
    expect(calculateScamRisk('personal', 0.9, 0.95)).toBe('high')
    expect(calculateScamRisk('scam', 1, 1)).toBe('high')
  })

  test('returns medium when exactly one signal is present', () => {
    expect(calculateScamRisk('scam', 0.1, 0.1)).toBe('medium')
    expect(calculateScamRisk('personal', 0.9, 0.1)).toBe('medium')
    expect(calculateScamRisk('advertising', 0.1, 0.9)).toBe('medium')
  })

  test('returns low when no signal is present', () => {
    expect(calculateScamRisk('personal', 0.1, 0.1)).toBe('low')
    expect(calculateScamRisk('advertising', 0, 0)).toBe('low')
  })

  test('counts a value equal to the threshold as a signal', () => {
    expect(calculateScamRisk('personal', 0.8, 0)).toBe('medium')
  })

  test('ignores a value just below the threshold', () => {
    expect(calculateScamRisk('personal', 0.79, 0)).toBe('low')
  })
})