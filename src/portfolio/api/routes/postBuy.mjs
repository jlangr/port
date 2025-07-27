export const postBuy = (buyShares) => async (req, res) => {
  const { symbol, shares } = req.body
  await buyShares(symbol, shares)
  res.status(204).end()
}
