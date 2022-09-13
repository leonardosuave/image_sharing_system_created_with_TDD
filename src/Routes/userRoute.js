const express = require('express')
const route = express.Router()
const userController = require('../Controllers/UserController')
const UserModel = require('../Models/UserModel')

route.post('/user', userController.register)

//Rota de delete do usuário de teste criado
route.delete('/user/:email', userController.deleteUser)

//To send Token JWT
route.post('/auth', userController.auth)

module.exports = route