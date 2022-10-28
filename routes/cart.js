const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const middleware = require('../middleware')

router.post('/add-product/:id', middleware.checkAuthorization, cartController.addProduct)

module.exports = router