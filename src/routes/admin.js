const express=require('express')
const route=express.Router()
const upload=require('../middlewares/multer')
const {AdminController}=require('../controllers')

route.get('/add',AdminController.add)
route.post('/add',upload.single('image'),AdminController.save)
route.get('/edit/:id',AdminController.edit)
route.post('/edit/:id',upload.single('image'),AdminController.saveEdit)
route.get('/:id',AdminController.detail)
route.get('/',AdminController.show)

module.exports=route