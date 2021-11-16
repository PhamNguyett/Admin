const express=require('express')
const route=express.Router()

const AddProductController=require('../conttrollers/AddProductController.js')

route.get('/',AddProductController.index)
module.exports=route