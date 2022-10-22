const express = require('express')
const db = require('./config/index')
const app = express()
const port = 3000
const path = require('path')
const Product = require('./models/product')
const Category = require('./models/category')
const Cart = require('./models/cart')
const cors = require('cors')

try {
  db.authenticate().then(() => {
    console.log('Database Connected.');
  })
} catch (error) {
  console.log(error);
}

app.use(cors())
app.use('/static', express.static(path.join(__dirname, 'public')))

const hello = require('./routes/hello')

const categories = require('./routes/category')
const products = require('./routes/product')
const user = require('./routes/user')
const profile = require('./routes/profile')
const User = require('./models/user')

app.use(express.json())

app.use('/api/v1/hello', hello)
app.use('/api/v1/categories', categories)
app.use('/api/v1/products', products)
app.use('/api/v1/auth', user)
app.use('/api/v1/profile', profile)

app.listen(port, async () => {
  console.log(`app listening on port ${port}`)
  await Category.sync({ alter: true })
  await Product.sync({ alter: true })
  await User.sync({alter: true})
  await Cart.sync({ alter: true })
})