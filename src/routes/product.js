const express=require('express')
const route=express.Router()

const ProductController=require('../conttrollers/ProductController')

route.get('/all',ProductController.viewProduct)
route.get('/edit',ProductController.editProduct)
route.get('/add',ProductController.addProduct)
module.exports=route