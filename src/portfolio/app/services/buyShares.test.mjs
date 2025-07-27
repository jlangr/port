import { buyShares } from './buyShares.mjs'

describe('buyShares', () => {
  it('appends a buy event with the current timestamp', async () => {
    const repo = {
      loadEventsForSymbol: async () => [],
      appendEvent: jest.fn()
    }
    const clock = { now: () => 'NOW' }

    const fn = buyShares(repo, clock)
    await fn('AAPL', 100)

    expect(repo.appendEvent).toHaveBeenCalledWith('AAPL', {
      type: 'buy',
      shares: 100,
      timestamp: 'NOW'
    })
  })
})
