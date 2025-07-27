import { MongoClient } from 'mongodb'
import { SystemClock } from '../../infra/adapters/SystemClock.mjs'
import { MongoPortfolioRepository } from '../../infra/adapters/MongoPortfolioRepository.mjs'
import { buyShares } from '../../app/services/buyShares.mjs'
import { sellShares } from '../../app/services/sellShares.mjs'
import { getShares } from '../../app/services/getShares.mjs'
import { getTransactions } from '../../app/services/getTransactions.mjs'
import { getPosition } from '../../app/services/getPosition.mjs'

describe('REST E2E', () => {
  let db, repo

  beforeAll(async () => {
    const client = await MongoClient.connect('mongodb://localhost:27017')
    db = client.db('portfolio_test')
    repo = MongoPortfolioRepository(db)
    await db.collection('events').deleteMany({})
  })

  it('tracks purchases and sales', async () => {
    const clock = SystemClock('2025-06-04 13:01:00')
    await buyShares(repo, clock)('AAPL', 50)

    const clock2 = SystemClock('2025-06-04 13:02:00')
    await buyShares(repo, clock2)('IBM', 75)

    const sharesIBM = await getShares(repo)('IBM')
    expect(sharesIBM).toBe(75)

    const txnsAAPL = await getTransactions(repo)('AAPL')
    expect(txnsAAPL).toEqual([['buy', '2025-06-04 13:01:00']])

    await sellShares(repo, SystemClock('2025-06-04 14:00:00'))('IBM', 55)
    const sharesLeft = await getShares(repo)('IBM')
    expect(sharesLeft).toBe(20)

    const pos = await getPosition(repo)('IBM')
    expect(pos).toEqual({ symbol: 'IBM', shares: 20, numberOfTransactions: 2 })
  })
})
