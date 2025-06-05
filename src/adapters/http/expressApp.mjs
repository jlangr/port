import express from 'express'
import bodyParser from 'body-parser'
import { createMongoRepo } from '../mongo/mongoRepo.mjs'
import { systemClock } from '../infra/systemClock.mjs'
import { createPortfolioService } from '../../services/portfolioService.mjs'
import { createRoutes } from './routes.mjs'

export const createApp = async () => {
  const app = express()
  app.use(bodyParser.json())

  const repo = await createMongoRepo()
  const service = createPortfolioService(repo, systemClock)
  app.use('/api', createRoutes(service))

  return app
}
