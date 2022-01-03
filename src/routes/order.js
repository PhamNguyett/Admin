const express=require('express')
const route=express.Router()

const OrderController=require('../controllers/OrderController')

route.get('/',OrderController.index)
route.get('/waiting',OrderController.waiting)
route.get('/processed',OrderController.processed)
route.get('/accept/:id',OrderController.accept)
module.exports=route