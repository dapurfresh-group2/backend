const express = require('express')
const router = express.Router()
const productController = require('../controllers/product')

router.get('/', productController.getAllProduct)
router.get('/:name', productController.searchProduct)

module.exports = router
