import { createPurchaseEvent, applyTransactions, getTransactionsBySymbol } from '../domain/portfolio.mjs'

export const createPortfolioService = (repo, clock) => ({
  purchase: async (symbol, shares) => {
    const timestamp = clock.now().toISOString()
    const event = createPurchaseEvent(symbol, shares, timestamp)
    await repo.recordTransaction(event)
  },
  getHoldings: async () => {
    const txs = await repo.getAllTransactions()
    return applyTransactions(txs)
  },
  getTransactions: async (symbol) => {
    const txs = await repo.getAllTransactions()
    return getTransactionsBySymbol(txs, symbol)
  }
})
