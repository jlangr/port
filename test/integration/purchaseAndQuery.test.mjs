import request from 'supertest'
import { MongoClient } from 'mongodb'
import { createApp } from '../../src/adapters/http/expressApp.mjs'
import { createMongoRepo } from '../../src/adapters/mongo/mongoRepo.mjs'
import { createPortfolioService } from '../../src/services/portfolioService.mjs'

let app
let dbClient
let db

beforeAll(async () => {
  dbClient = await MongoClient.connect('mongodb://localhost:27017')
  db = dbClient.db('portfolio')
  await db.collection('events').deleteMany({})
  app = await createApp()
})

afterAll(async () => {
  await dbClient.close()
})

beforeEach(async () => {
  await db.collection('events').deleteMany({})
})

describe('stock portfolio integration', () => {
  it('retrieves shares of purchased symbol', async () => {
    await request(app).post('/api/purchase').send({ symbol: 'IBM', shares: 20 }).expect(201)
    const res = await request(app).get('/api/holdings')
    expect(res.body.IBM).toBe(20)
  })

  it('supports multiple purchases of multiple symbols', async () => {
    await request(app).post('/api/purchase').send({ symbol: 'AAPL', shares: 100 })
    await request(app).post('/api/purchase').send({ symbol: 'IBM', shares: 30 })
    await request(app).post('/api/purchase').send({ symbol: 'AAPL', shares: 250 })

    const holdings = await request(app).get('/api/holdings')
    expect(holdings.body.AAPL).toBe(350)
    expect(holdings.body.IBM).toBe(30)
  })

  it('tracks transaction history with injected time (service only)', async () => {
    const repo = await createMongoRepo()
    const clockMock = { now: () => new Date('2025-06-04T13:01:00Z') }
    const service = createPortfolioService(repo, clockMock)

    await service.purchase('AAPL', 50)

    clockMock.now = () => new Date('2025-06-04T13:02:00Z')
    await service.purchase('IBM', 75)

    clockMock.now = () => new Date('2025-06-04T13:03:00Z')
    await service.purchase('AAPL', 100)

    const aaplTx = await service.getTransactions('AAPL')
    const ibmTx = await service.getTransactions('IBM')

    expect(aaplTx.map(t => t.timestamp)).toEqual([
      '2025-06-04T13:01:00.000Z',
      '2025-06-04T13:03:00.000Z'
    ])

    expect(ibmTx.map(t => t.timestamp)).toEqual([
      '2025-06-04T13:02:00.000Z'
    ])
  })
})
