const express = require('express')
const route = express.Router()
const homeController = require('../Controllers/HomeController')

route.get('/', homeController.index)

module.exports = route