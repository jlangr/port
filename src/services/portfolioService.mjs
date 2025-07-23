import {
  createPurchaseEvent,
  applyTransactions,
  getTransactionsBySymbol,
  getPositionFromTransactions
} from '../domain/portfolio.mjs'

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
  },
  getPosition: symbol => getPosition(repo, symbol),
})

const getPosition = async (repo, symbol) => {
  const transactionsBySymbol = getTransactionsBySymbol(await repo.getAllTransactions(), symbol)
  if (transactionsBySymbol.length === 0)
    throw new Error(`Symbol ${symbol} not held`)
  return getPositionFromTransactions(transactionsBySymbol)
}
