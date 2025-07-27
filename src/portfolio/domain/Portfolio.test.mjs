// domain/Portfolio.test.mjs
import { buildPortfolio, getShares, getTransactions, getPosition } from './Portfolio.mjs'

describe('Portfolio', () => {
  it('computes shares and transactions correctly', () => {
    const events = [
      { type: 'buy', shares: 100, timestamp: 'now' },
      { type: 'sell', shares: 20, timestamp: 'later' }
    ]
    const p = buildPortfolio(events)
    expect(getShares(p)).toBe(80)
    expect(getTransactions(p)).toEqual([['buy', 'now'], ['sell', 'later']])
    expect(getPosition('XYZ', p)).toEqual({ symbol: 'XYZ', shares: 80, numberOfTransactions: 2 })
  })
})
