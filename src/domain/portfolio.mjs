export const createPurchaseEvent = (symbol, shares, timestamp) => ({
  type: 'purchase',
  symbol,
  shares,
  timestamp
})

export const createSellEvent = (symbol, shares, timestamp) => ({
  type: 'sell',
  symbol,
  shares,
  timestamp
})

const isSymbol = symbol => event => event.symbol === symbol

const applyTransaction = (acc, event) => {
  const current = acc[event.symbol] || 0
  const delta = event.type === 'purchase' ? event.shares : -event.shares
  return { ...acc, [event.symbol]: current + delta }
}

export const applyTransactions = transactions =>
  transactions.reduce(applyTransaction, {})

export const getTransactionsBySymbol = (transactions, symbol) =>
  transactions.filter(isSymbol(symbol))
