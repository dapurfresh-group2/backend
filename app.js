const express = require('express')
const app = express()
const port = 3000

const hello = require('./routes/hello')
const user = require('./routes/user')
const profile = require('./routes/profile')
const User = require('./models/user')

app.use(express.json())

app.use('/api/v1/auth', user)
app.use('/api/v1/profile', profile)

app.listen(port, async() => {
  console.log(`app listening on port ${port}`)
  await User.sync({alter: true})
})