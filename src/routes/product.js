const publicURL=require('../public/url')
const multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, publicURL+'/uploads')
    },
    filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({ storage: storage })


const express=require('express')
const route=express.Router()

const ProductController=require('../conttrollers/ProductController')

route.get('/caterology/:slug',ProductController.caterology)
route.get('/detail/:slug',ProductController.detail)
route.delete('/delete/:id',ProductController.deleteProduct)
route.get('/restore/:id',ProductController.restore)
route.get('/edit/:slug',ProductController.editProduct)
route.post('/edit/:slug',upload.array('image',12),ProductController.saveEditProduct)
route.post('/add',upload.array('image',12),ProductController.createProduct)
route.get('/add',ProductController.addProduct)
route.get('/',ProductController.viewProduct)
module.exports=route