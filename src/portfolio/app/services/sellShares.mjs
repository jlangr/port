import { buildPortfolio } from '../../domain/Portfolio.mjs'

export const sellShares = (repo, clock) => async (symbol, shares) => {
  const events = await repo.loadEventsForSymbol(symbol)
  buildPortfolio(events) // same deal
  await repo.appendEvent(symbol, { type: 'sell', shares, timestamp: clock.now() })
}
