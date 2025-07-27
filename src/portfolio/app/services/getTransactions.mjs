import { buildPortfolio, getTransactions as extract } from '../../domain/Portfolio.mjs'

export const getTransactions = (repo) => async (symbol) => {
  const events = await repo.loadEventsForSymbol(symbol)
  return extract(buildPortfolio(events))
}
