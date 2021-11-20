const express=require('express')
const route=express.Router()

const ProductPaginationController=require('../conttrollers/ProductPaginationController.js')

route.get('/',ProductPaginationController.index)
module.exports=route