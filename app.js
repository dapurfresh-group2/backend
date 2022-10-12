const express = require('express')
const db = require('./config/index')
const app = express()
const port = 3000

try {
  db.authenticate().then(() => {
    console.log('Database Connected.');
  })
} catch (error) {
  console.log(error);
}

const hello = require('./routes/hello')

app.use(express.json())

app.use('/api/v1/hello', hello)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})