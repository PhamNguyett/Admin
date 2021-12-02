const express=require('express')
const route=express.Router()

const LoginController=require('../controllers/LoginController')

route.get('/',LoginController.Login)

route.get('/resetpassword',LoginController.Reset)
module.exports=route