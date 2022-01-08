const express=require('express')
const route=express.Router()
const multer=require('../middlewares/multer')

const {CategoryController}=require('../controllers')

route.get('/',CategoryController.index)
route.post('/add',multer.single('image'),CategoryController.add)
module.exports=route