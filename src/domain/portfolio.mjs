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

export const getPositionFromTransactions = transactions =>
  Object.values(
    transactions.reduce(
      (acc, { symbol, shares }) =>
        acc[symbol]
          ? {
            ...acc,
            [symbol]: {
              symbol,
              shares: acc[symbol].shares + shares,
              numberOfTransactions: acc[symbol].numberOfTransactions + 1
            }
          }
          : {
            ...acc,
            [symbol]: {
              symbol,
              shares,
              numberOfTransactions: 1
            }
          },
      {}
    )
  )
