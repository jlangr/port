import { createPortfolioService } from '../../src/services/portfolioService.mjs'

describe('createPortfolioService.getPosition', () => {
  const repo = { getAllTransactions: jest.fn() }
  const clock = {}

  it('returns position summary for held symbol', async () => {
    const transactions = [{ type: 'purchase', symbol: 'AAPL', shares: 5, timestamp: '2025-06-01' }]
    repo.getAllTransactions.mockResolvedValue(transactions)
    const service = createPortfolioService(repo, clock)
    await expect(service.getPosition('AAPL')).resolves.toEqual({ symbol: 'AAPL', shares: 5, numberOfTransactions: 1 })
  })

  it('throws error when symbol not held', async () => {
    repo.getAllTransactions.mockResolvedValue([])
    const service = createPortfolioService(repo, clock)
    await expect(service.getPosition('XYZ')).rejects.toThrow('Symbol XYZ not held')
  })
})
