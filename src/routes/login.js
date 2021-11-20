const express=require('express')
const route=express.Router()

const LoginController=require('../conttrollers/LoginController')

route.get('/',LoginController.index)
module.exports=route