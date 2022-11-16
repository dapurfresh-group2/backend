const express = require('express')
const router = express.Router()
const profileController = require('../controllers/profile')
const middleware = require('../middleware')

router.get('/user', middleware.checkAuthorization , profileController.getProfile)
router.put('/edit', middleware.checkAuthorization , profileController.updateProfile)

module.exports = router