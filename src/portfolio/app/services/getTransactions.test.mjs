import { getTransactions } from './getTransactions.mjs'

describe('getTransactions', () => {
  it('returns a list of [type, timestamp] from events', async () => {
    const repo = {
      loadEventsForSymbol: async () => [
        { type: 'buy', shares: 50, timestamp: 't1' },
        { type: 'sell', shares: 20, timestamp: 't2' }
      ]
    }

    const fn = getTransactions(repo)
    const result = await fn('MSFT')

    expect(result).toEqual([
      ['buy', 't1'],
      ['sell', 't2']
    ])
  })
})
