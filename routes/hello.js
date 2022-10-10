const express = require('express')
const router = express.Router()
const helloController = require('../controllers/hello')

router.get('/', helloController.hello)

module.exports = router