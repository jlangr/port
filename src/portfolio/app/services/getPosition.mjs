import { buildPortfolio, getPosition as extract } from '../../domain/Portfolio.mjs'

export const getPosition = (repo) => async (symbol) => {
  const events = await repo.loadEventsForSymbol(symbol)
  return extract(symbol, buildPortfolio(events))
}
