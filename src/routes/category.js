const express=require('express')
const route=express.Router()

const {CategoryController}=require('../controllers')

route.get('/',CategoryController.index)
module.exports=route