// domain/Portfolio.mjs
export const applyEvent = (state, event) =>
  event.type === 'buy' ? { ...state, shares: state.shares + event.shares, txns: [...state.txns, event] } :
    event.type === 'sell' ? { ...state, shares: state.shares - event.shares, txns: [...state.txns, event] } :
      state

export const buildPortfolio = (events) =>
  events.reduce(applyEvent, { shares: 0, txns: [] })

export const getShares = (portfolio) =>
  portfolio.shares

export const getTransactions = (portfolio) =>
  portfolio.txns.map(e => [e.type, e.timestamp])

export const getPosition = (symbol, portfolio) => ({
  symbol,
  shares: portfolio.shares,
  numberOfTransactions: portfolio.txns.length
})
