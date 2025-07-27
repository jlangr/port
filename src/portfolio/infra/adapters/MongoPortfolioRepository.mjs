import { MongoClient } from 'mongodb'

export const MongoPortfolioRepository = (db) => ({
  loadEventsForSymbol: async (symbol) =>
    await db.collection('events').find({ symbol }).sort({ timestamp: 1 }).toArray(),

  appendEvent: async (symbol, event) =>
    await db.collection('events').insertOne({ ...event, symbol })
})
