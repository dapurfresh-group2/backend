const express = require('express')
const app = express()
const port = 3000

const hello = require('./routes/hello')

app.use(express.json())

app.use('/api/v1/hello', hello)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})