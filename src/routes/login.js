const express=require('express')
const route=express.Router()

const LoginController=require('../controllers/LoginController')
const passport = require('../controllers/helper/auth')

route.get('/',LoginController.login)
route.post('/',passport.authenticate('local',{ successRedirect: '/product',failureRedirect: '/login' }))

route.get('/resetpassword',LoginController.reset)
module.exports=route