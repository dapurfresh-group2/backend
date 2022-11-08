const express = require('express')
const router = express.Router()
const orderController = require('../controllers/order')
const middleware = require('../middleware')

router.post('/checkout/:cartId', middleware.checkAuthorization, orderController.checkout)
router.get('/history/', middleware.checkAuthorization, orderController.history)
router.post('/history/:orderId', middleware.checkAuthorization, orderController.getDetailOrder)
router.post('/cancel-order/:orderId', middleware.checkAuthorization, orderController.cancelOrder)


module.exports = router