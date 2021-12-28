const express=require('express')
const route=express.Router()

const OrderController=require('../controllers/OrderController')

route.get('/order',OrderController.index)
module.exports=route