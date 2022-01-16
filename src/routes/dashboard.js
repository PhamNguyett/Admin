const express=require('express')
const route=express.Router()

const {DashboardController}=require('../controllers')

route.get('/',DashboardController.analysisProduct)
module.exports=route