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

export const applyTransactions = (txns) =>
  txns.reduce((acc, txn) =>
    ({
      ...acc,
      [txn.symbol]:
        (acc[txn.symbol] ?? 0) +
        (txn.type === 'purchase' ? txn.shares : -txn.shares)
    }), {})

export const getTransactionsBySymbol = (txns, symbol) =>
  txns.filter(txn => txn.symbol === symbol)
