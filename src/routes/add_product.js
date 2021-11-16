const express=require('express')
const route=express.Router()

const AddProductController=require('../conttrollers/AddProductController')

route.get('/',AddProductController.index)
module.exports=route