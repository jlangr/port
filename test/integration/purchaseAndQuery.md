For routes.mjs, add a new route.

GET /position/:symbol

Examples to add to purchaseAndQuery.md

Returns not found if symbol not held (no transactions exist for that symbol):
mock the portfolioService.getPosition function to throw an error
GET /api/position/IBM => 401

Returns the position summary for a held symbol:
POST /api/purchase?symbol=AAPL&shares=100
POST /api/purchase?symbol=AAPL&shares=20
GET /api/position/AAPL =>  200; { "symbol": "AAPL", "shares": 120, numberOfTransactions: 2 }

Provide new route support for addition to routes.mjs
==
For portfolioService.mjs:

Create a new async function getPosition(symbol) that calls getTransactionsBySymbol and passes the results to getPositionFromTransactions.

Interfaces:

portfolio::getPositionFromTransactions(transactions)
portfolio::getTransactionsBySymbol(transactions, symbol)

Design constraints:

Mock the repo.getAllTransactions() function only. Do not use any other mocks.
Update the function createPortfolioService(repo, clock) in portfolioService.mjs. Include the new function getPosition(symbol).

Examples:

Happy path example::
mock repo.getAllTransactions() => [{ type: 'purchase', symbol: 'AAPL', shares: 5, timestamp: '2025-06-01' }]
verify that getPositions('AAPL') equals { symbol: "AAPL", shares: 5, numberOfTransactions: 1 }

Unhappy path (no transactions for symbol):
mock repo.getAllTransactions() => []
verify error thrown: "Symbol XYZ not held"
===
For domain.test.mjs / portfolio.mjs:

Generate a new function, getPositionFromTransactions, that takes on an array of transactions.

Examples:

getPositionFromTransactions([
  { type: 'purchase', symbol: 'AAPL', shares: 5, timestamp: '2025-06-01' }
  { type: 'sell', symbol: 'AAPL', shares: 15, timestamp: '2025-06-02' }])
    => [{ symbol: "AAPL", shares: 20, numberOfTransactions: 2 }]

