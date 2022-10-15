const express = require('express')
const app = express()
const port = 3000

const hello = require('./routes/hello')
const user = require('./routes/user')
const profile = require('./routes/profile')
const Store = require('./models/user')

app.use(express.json())

app.use('/api/auth', user)
app.use('/api/profile', profile)

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
  Store.sync({alter: true})
})