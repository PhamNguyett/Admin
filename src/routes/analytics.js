const express=require('express')
const route=express.Router()

const AnalyticsController=require('../controllers/AnalyticsController.js')

route.get('/',AnalyticsController.index)
module.exports=route