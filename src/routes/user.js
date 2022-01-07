const express=require('express')
const route=express.Router()

const {UserController}=require('../controllers')

route.get('/',UserController.index)
module.exports=route