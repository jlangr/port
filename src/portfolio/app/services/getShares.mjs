import { buildPortfolio, getShares as extract } from '../../domain/Portfolio.mjs'

export const getShares = (repo) => async (symbol) => {
  const events = await repo.loadEventsForSymbol(symbol)
  return extract(buildPortfolio(events))
}
