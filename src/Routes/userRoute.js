const express = require('express')
const route = express.Router()
const userController = require('../Controllers/UserController')

route.post('/user', userController.register)

module.exports = route