const express=require('express')
const route=express.Router()

const AdminController=require('../controllers/AdminController')

route.get('/add',AdminController.add)
route.post('/list',AdminController.list)
route.get('/:slug',AdminController.detail)
route.get('/',AdminController.show)

module.exports=route