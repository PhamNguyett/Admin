const express=require('express')
const route=express.Router()

const DashboardController=require('../conttrollers/DashboardController.js')

route.get('/',DashboardController.index)
module.exports=route