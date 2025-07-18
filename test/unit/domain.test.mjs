import { createPurchaseEvent, createSellEvent, applyTransactions, getTransactionsBySymbol, getPositionFromTransactions } from '../../src/domain/portfolio.mjs'

describe('portfolio', () => {
  it('increases shares on purchase', () => {
    const result = applyTransactions([
      createPurchaseEvent('IBM', 10, '2025-01-01'),
      createPurchaseEvent('AAPL', 20, '2025-01-02'),
      createPurchaseEvent('IBM', 10, '2025-01-03')
    ])
    expect(result).toEqual({ IBM: 20, AAPL: 20 })
  })

  it('decreases shares on sale', () => {
    const result = applyTransactions([
      createPurchaseEvent('IBM', 50, '2025-07-01'),
      createSellEvent('IBM', 20, '2025-07-02')
    ])
    expect(result).toEqual({ IBM: 30 })
  })

  it('filters transactions by symbol', () => {
    const result = getTransactionsBySymbol([
      createPurchaseEvent('IBM', 5, '2025-06-01'),
      createPurchaseEvent('AAPL', 10, '2025-06-02'),
      createPurchaseEvent('IBM', 15, '2025-06-03')
    ], 'IBM')
    expect(result).toEqual([
      { type: 'purchase', symbol: 'IBM', shares: 5, timestamp: '2025-06-01' },
      { type: 'purchase', symbol: 'IBM', shares: 15, timestamp: '2025-06-03' }
    ])
  })

  describe('getPositionFromTransactions', () => {
    it('returns position summary for a single symbol', () =>
      expect(
        getPositionFromTransactions([
          { type: 'purchase', symbol: 'AAPL', shares: 5, timestamp: '2025-06-01' },
          { type: 'sell', symbol: 'AAPL', shares: 15, timestamp: '2025-06-02' }
        ])
      ).toEqual([
        { symbol: 'AAPL', shares: 20, numberOfTransactions: 2 }
      ])
    )
  })
})

