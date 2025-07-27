import { buildPortfolio } from '../../domain/Portfolio.mjs'

export const buyShares = (repo, clock) => async (symbol, shares) => {
  const events = await repo.loadEventsForSymbol(symbol)
  buildPortfolio(events) // validate shape—no-op here
  await repo.appendEvent(symbol, { type: 'buy', shares, timestamp: clock.now() })
}
