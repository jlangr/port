import { createApp } from './adapters/http/expressApp.mjs'

const port = process.env.PORT || 3000
const app = await createApp()

app.listen(port, () => {
  console.log(`Portfolio service running on http://localhost:${port}`)
})
