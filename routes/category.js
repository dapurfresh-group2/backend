const express = require('express')
const router = express.Router()
const categoryController = require('../controllers/category')
const middleware = require('../middleware')

router.get('/', middleware.checkAuthorization, categoryController.getAllCategory)

module.exports = router