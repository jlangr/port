import express from 'express'

export const createRoutes = (service) => {
  const router = express.Router()

  router.post('/purchase', async (req, res) => {
    const { symbol, shares } = req.body
    await service.purchase(symbol, shares)
    res.status(201).send({ status: 'ok' })
  })

  router.get('/holdings', async (req, res) => {
    const holdings = await service.getHoldings()
    res.send(holdings)
  })

  router.get('/transactions/:symbol', async (req, res) => {
    const txs = await service.getTransactions(req.params.symbol)
    res.send(txs)
  })

  return router
}
