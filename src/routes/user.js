const express=require('express')
const route=express.Router()

const {UserController}=require('../controllers')

route.get('/block/:id',UserController.block)
route.get('/unblock/:id',UserController.unblock)
route.get('/user-block',UserController.userBlock)
route.get('/',UserController.index)
module.exports=route