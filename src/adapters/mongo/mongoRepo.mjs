import { MongoClient } from 'mongodb'

export const createMongoRepo = async (url = 'mongodb://localhost:27017', dbName = 'portfolio') => {
  const client = await MongoClient.connect(url)
  const db = client.db(dbName)
  const events = db.collection('events')

  return {
    recordTransaction: async (event) => {
      await events.insertOne(event)
    },
    getAllTransactions: async () => {
      const txs = await events.find().sort({ timestamp: 1 }).toArray()
      return txs.map(({ _id, ...tx }) => tx)
    }
  }
}
