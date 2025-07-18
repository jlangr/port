import { jest } from '@jest/globals'
import { createPortfolioService } from '../../../src/services/portfolioService.mjs'
import * as portfolioDomain from '../../../src/domain/portfolio.mjs'

jest.mock('../../../src/domain/portfolio.mjs')

describe('createPortfolioService.getPosition', () => {
  const sampleTransactions = [
    { type: 'purchase', symbol: 'IBM', shares: 10, timestamp: '2025-06-01' },
    { type: 'sell', symbol: 'IBM', shares: 5, timestamp: '2025-06-02' }
  ]
  const positionSummary = [{ symbol: 'IBM', shares: 15, numberOfTransactions: 2 }]

  const repo = { getTransactions: jest.fn() }
  const clock = {}

  it('returns position summary for held symbol', async () => {
    repo.getTransactions.mockResolvedValue(sampleTransactions)
    portfolioDomain.getPositionFromTransactions.mockReturnValue(positionSummary)
    const service = createPortfolioService(repo, clock)
    await expect(service.getPosition('IBM')).resolves.toEqual(positionSummary)
    expect(portfolioDomain.getPositionFromTransactions).toHaveBeenCalledWith(sampleTransactions)
  })

  it('throws error when symbol not held', async () => {
    repo.getTransactions.mockResolvedValue([])
    const service = createPortfolioService(repo, clock)
    await expect(service.getPosition('XYZ')).rejects.toThrow('Symbol XYZ not held')
  })
})
