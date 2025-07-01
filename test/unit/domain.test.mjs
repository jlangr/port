import { createPurchaseEvent, createSellEvent, applyTransactions, getTransactionsBySymbol } from '../../src/domain/portfolio.mjs'

describe('applyTransactions', () => {
  it('increases shares on purchase', () => {
    const txns = [
      createPurchaseEvent('IBM', 10, '2025-01-01'),
      createPurchaseEvent('AAPL', 20, '2025-01-02'),
      createPurchaseEvent('IBM', 10, '2025-01-03')
    ]
    expect(applyTransactions(txns)).toEqual({ IBM: 20, AAPL: 20 })
  })

  it('decreases shares on sale', () => {
    const txns = [
      createPurchaseEvent('IBM', 50, '2025-07-01'),
      createSellEvent('IBM', 20, '2025-07-02')
    ]
    expect(applyTransactions(txns)).toEqual({ IBM: 30 })
  })
})

describe('getTransactionsBySymbol', () => {
  it('filters transactions by symbol', () => {
    const txns = [
      createPurchaseEvent('IBM', 5, '2025-06-01'),
      createPurchaseEvent('AAPL', 10, '2025-06-02'),
      createPurchaseEvent('IBM', 15, '2025-06-03')
    ]
    expect(getTransactionsBySymbol(txns, 'IBM')).toEqual([
      { type: 'purchase', symbol: 'IBM', shares: 5, timestamp: '2025-06-01' },
      { type: 'purchase', symbol: 'IBM', shares: 15, timestamp: '2025-06-03' }
    ])
  })
})
