const express=require('express')
const route=express.Router()

const LoginController=require('../conttrollers/LoginController')

route.get('/',LoginController.Login)

route.get('/resetpassword',LoginController.Reset)
module.exports=route