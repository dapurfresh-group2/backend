const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')
const middleware = require('../middleware')

router.get('/', middleware.checkAuthorization, productController.getAllProduct)
router.get('/best-products', middleware.checkAuthorization, productController.bestProduct)
router.get('/:name', middleware.checkAuthorization, productController.searchProduct)


module.exports = router
