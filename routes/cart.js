const express = require('express')
const router = express.Router()
const cartController = require('../controllers/cart')
const middleware = require('../middleware')

router.get('/', middleware.checkAuthorization, cartController.getCartActive)
router.post('/post-product/:id', middleware.checkAuthorization, cartController.postProduct)

module.exports = router