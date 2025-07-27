import { getShares } from './getShares.mjs'

describe('getShares', () => {
  it('returns computed shares from loaded events', async () => {
    const repo = {
      loadEventsForSymbol: async () => [
        { type: 'buy', shares: 30 },
        { type: 'sell', shares: 10 }
      ]
    }

    const fn = getShares(repo)
    const result = await fn('AAPL')

    expect(result).toBe(20)
  })
})
