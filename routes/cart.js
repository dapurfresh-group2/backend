const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const middleware = require('../middleware')

router.post('/post-product/:id', middleware.checkAuthorization, cartController.postProduct)

module.exports = router