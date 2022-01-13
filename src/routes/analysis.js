const express=require('express')
const route=express.Router()

const {AnalysisController}=require('../controllers')

route.get('/product',AnalysisController.analysisProduct)
route.get('/',AnalysisController.index)
module.exports=route