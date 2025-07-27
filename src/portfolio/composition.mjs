// composition.mjs
import express from 'express'
import { MongoClient } from 'mongodb'

import { SystemClock } from './infra/adapters/SystemClock.mjs'
import { MongoPortfolioRepository } from './infra/adapters/MongoPortfolioRepository.mjs'

import { buyShares } from './app/services/buyShares.mjs'
import { sellShares } from './app/services/sellShares.mjs'
import { getShares } from './app/services/getShares.mjs'
import { getTransactions } from './app/services/getTransactions.mjs'
import { getPosition } from './app/services/getPosition.mjs'

import { postBuy } from './api/routes/postBuy.mjs'
import { postSell } from './api/routes/postSell.mjs'
import { getSharesRoute } from './api/routes/getSharesRoute.mjs'
import { getTransactionsRoute } from './api/routes/getTransactionsRoute.mjs'
import { getPositionRoute } from './api/routes/getPositionRoute.mjs'

const main = async () => {
  const client = await MongoClient.connect('mongodb://localhost:27017')
  const db = client.db('portfolio')
  const repo = MongoPortfolioRepository(db)
  const clock = SystemClock()

  const app = express()
  app.use(express.json())

  app.post('/buy', postBuy(buyShares(repo, clock)))
  app.post('/sell', postSell(sellShares(repo, clock)))
  app.get('/shares/:symbol', getSharesRoute(getShares(repo)))
  app.get('/transactions/:symbol', getTransactionsRoute(getTransactions(repo)))
  app.get('/position/:symbol', getPositionRoute(getPosition(repo)))

  app.listen(3000)
}

main()
