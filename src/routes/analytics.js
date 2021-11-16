const express=require('express')
const route=express.Router()

const AnalyticsController=require('../conttrollers/AnalyticsController.js')

route.get('/',AddProductController.index)
module.exports=route