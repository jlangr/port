export const postSell = (sellShares) => async (req, res) => {
  const { symbol, shares } = req.body
  await sellShares(symbol, shares)
  res.status(204).end()
}
