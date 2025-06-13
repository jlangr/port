export const createPurchaseEvent = (symbol, shares, timestamp) => ({
  type: 'purchase',
  symbol,
  shares,
  timestamp
})

export const applyTransactions = (transactions) =>
  transactions.reduce(
    (holdings, { symbol, shares }) => ({
      ...holdings,
      [symbol]: (holdings[symbol] || 0) + shares
    }),
    {}
  )

export const getTransactionsBySymbol = (transactions, symbol) =>
  transactions.filter(tx => tx.symbol === symbol)
