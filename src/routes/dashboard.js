const express=require('express')
const route=express.Router()

const {DashboardController}=require('../controllers')

route.get('/',DashboardController.index)
module.exports=route