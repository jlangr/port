import { sellShares } from './sellShares.mjs'

describe('sellShares', () => {
  it('appends a sell event with the current timestamp', async () => {
    const repo = {
      loadEventsForSymbol: async () => [],
      appendEvent: jest.fn()
    }
    const clock = { now: () => 'NOW' }

    const fn = sellShares(repo, clock)
    await fn('IBM', 50)

    expect(repo.appendEvent).toHaveBeenCalledWith('IBM', {
      type: 'sell',
      shares: 50,
      timestamp: 'NOW'
    })
  })
})
