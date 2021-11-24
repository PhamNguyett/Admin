const express=require('express')
const route=express.Router()

const DashboardController=require('../conttrollers/DashboardController')

route.get('/',DashboardController.index)
module.exports=route