const express=require('express')
const route=express.Router()

const {AnalysisController}=require('../controllers')

route.get('/sale/week',AnalysisController.analysisSale)
route.get('/sale/month',AnalysisController.analysisSaleMonth)
route.get('/',AnalysisController.index)
module.exports=route