const express=require('express')
const route=express.Router()

const DashboardController=require('../controllers/DashboardController')

route.get('/',DashboardController.index)
module.exports=route