const express=require('express')
const route=express.Router()

const {OrderController}=require('../controllers')

route.get('/accept/:id',OrderController.accept)
route.get('/waiting',OrderController.waiting)
route.get('/delivery',OrderController.delivery)
route.get('/',OrderController.index)
module.exports=route