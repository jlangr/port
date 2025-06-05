export const applyTransactions = (transactions) =>
  transactions.reduce((holdings, { type, symbol, shares }) => {
    const current = holdings[symbol] || 0
    const delta = type === 'purchase' ? shares : -shares
    return { ...holdings, [symbol]: current + delta }
  }, {})

export const getTransactionsBySymbol = (transactions, symbol) =>
  transactions.filter(tx => tx.symbol === symbol)

export const createPurchaseEvent = (symbol, shares, timestamp) => ({
  type: 'purchase',
  symbol,
  shares,
  timestamp
})
