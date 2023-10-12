const {Router} = require('express')
const AuthController = require('../Middleware/Auth')
const UserController = require('../Controller/UserController')
const route = Router()


route.post('/getToken', AuthController.generateJWT)

route.post('/addToCart', AuthController.verify, UserController.addToCart)
route.post('/removeFromCart', AuthController.verify, UserController.removeFromCart)
route.get('/getCartDetails', AuthController.verify, UserController.getCartDetails)
route.post('/checkOut', AuthController.verify, UserController.checkOut)

module.exports = route

