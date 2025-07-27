export const getSharesRoute = (getShares) => async (req, res) => {
  const result = await getShares(req.params.symbol)
  res.json({ shares: result })
}
