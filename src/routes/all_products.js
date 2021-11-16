const express=require('express')
const route=express.Router()

const AllProductController=require('../conttrollers/AllProductController.js')

route.get('/',AllProductController.index)
module.exports=route