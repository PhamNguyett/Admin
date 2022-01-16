const upload=require('../middlewares/multer')


const express=require('express')
const route=express.Router()

const {ProductController}=require('../controllers')

route.get('/comment/delete/:id',ProductController.deleteComment)
route.get('/category/:slug',ProductController.category)
route.get('/detail/:slug',ProductController.detail)
route.delete('/delete/:id',ProductController.deleteProduct)
route.get('/restore/:id',ProductController.restore)
route.get('/edit/:slug',ProductController.editProduct)
route.post('/edit/:slug',upload.array('image',12),ProductController.saveEditProduct)
route.post('/add',upload.array('image',12),ProductController.createProduct)
route.get('/add',ProductController.addProduct)
route.get('/',ProductController.viewProduct)
module.exports=route