import { applyTransactions, createPurchaseEvent, getTransactionsBySymbol } from '../../src/domain/portfolio.mjs'

describe('domain logic', () => {
  it('applies transactions to get holdings', () => {
    const txs = [
      createPurchaseEvent('IBM', 10, '2025-01-01'),
      createPurchaseEvent('AAPL', 20, '2025-01-02'),
      createPurchaseEvent('IBM', 10, '2025-01-03')
    ]
    expect(applyTransactions(txs)).toEqual({ IBM: 20, AAPL: 20 })
  })

  it('filters transactions by symbol', () => {
    const txs = [
      createPurchaseEvent('IBM', 5, '2025-06-01'),
      createPurchaseEvent('AAPL', 10, '2025-06-02'),
      createPurchaseEvent('IBM', 15, '2025-06-03')
    ]
    expect(getTransactionsBySymbol(txs, 'IBM')).toEqual([
      { type: 'purchase', symbol: 'IBM', shares: 5, timestamp: '2025-06-01' },
      { type: 'purchase', symbol: 'IBM', shares: 15, timestamp: '2025-06-03' }
    ])
  })
})
