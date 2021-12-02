const express=require('express')
const route=express.Router()

const productController=require('../controllers/UserController')

route.get('/',productController.index)
module.exports=route