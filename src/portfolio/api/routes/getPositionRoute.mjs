export const getPositionRoute = (getPosition) => async (req, res) => {
  const result = await getPosition(req.params.symbol)
  res.json(result)
}
