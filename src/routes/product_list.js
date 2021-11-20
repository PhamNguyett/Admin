const express=require('express')
const route=express.Router()

const ProductListController=require('../conttrollers/ProductListController')

route.get('/',ProductListController.index)
module.exports=route