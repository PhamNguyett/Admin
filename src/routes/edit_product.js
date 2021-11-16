const express=require('express')
const route=express.Router()

const EditProductController=require('../conttrollers/EditProductController.js')

route.get('/',EditProductController.index)
module.exports=route