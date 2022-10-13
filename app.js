const express = require('express')
const db = require('./config/index')
const app = express()
const port = 3000
const Product = require('./models/product')
const Category = require('./models/category')

try {
  db.authenticate().then(() => {
    console.log('Database Connected.');
  })
} catch (error) {
  console.log(error);
}

const hello = require('./routes/hello')
const categories = require('./routes/category')

app.use(express.json())

app.use('/api/v1/hello', hello)
app.use('/api/v1/categories', categories)

app.listen(port, async () => {
  console.log(`app listening on port ${port}`)
  await Category.sync({ alter: true })
  await Product.sync({ alter: true })
})