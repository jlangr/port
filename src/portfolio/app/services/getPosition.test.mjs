import { getPosition } from './getPosition.mjs'

describe('getPosition', () => {
  it('returns position summary with symbol, shares, and txn count', async () => {
    const repo = {
      loadEventsForSymbol: async () => [
        { type: 'buy', shares: 60, timestamp: 't1' },
        { type: 'sell', shares: 10, timestamp: 't2' }
      ]
    }

    const fn = getPosition(repo)
    const result = await fn('GOOG')

    expect(result).toEqual({
      symbol: 'GOOG',
      shares: 50,
      numberOfTransactions: 2
    })
  })
})
