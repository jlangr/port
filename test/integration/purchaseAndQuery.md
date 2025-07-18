Add a new route to routes.mjs:

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

Add a new function getPosition(symbol) that retrieves the position for a given symbol. It should call getTransactions(symbol), then pass the results to a new function in portfolio.md, getPositionFromTransactions(transactions), that calculates the position summary.

Examples:

Happy path:
set expectation that getTransactions("IBM") returns an array X of sample transactions
verifies that portfolio::getPositionFromTransactions is called with X

Unhappy path (when symbol not held):
set expectation that getTransactions("XYZ") returns an empty array
throws an error with message "Symbol XYZ not held"

===

For domain.test.mjs / portfolio.mjs:

Generate a new function, getPositionFromTransactions, that takes on an array of transactions.

Examples:

getPositionFromTransactions([
  { type: 'purchase', symbol: 'AAPL', shares: 5, timestamp: '2025-06-01' }
  { type: 'sell', symbol: 'AAPL', shares: 15, timestamp: '2025-06-02' }])
    => [{ symbol: "AAPL", shares: 20, numberOfTransactions: 2 }]

