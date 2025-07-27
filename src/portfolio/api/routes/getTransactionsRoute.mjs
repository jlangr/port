export const getTransactionsRoute = (getTransactions) => async (req, res) => {
  const result = await getTransactions(req.params.symbol)
  res.json({ transactions: result })
}
