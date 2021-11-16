const express=require('express')
const route=express.Router()

const AnalyticsController=require('../conttrollers/AnalyticsController.js')

route.get('/',AnalyticsController.index)
module.exports=route