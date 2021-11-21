const Product =require('../database/models/Product')
class ProductController{
    async addProduct(req,res){
        res.render('add_product')
    }
    async createProduct(req,res){
        console.log(req.body.name)
        const file = req.file
        const path='/uploads/'+file.filename
        const newProduct=new Product({})
        if (!file) {
            const error = new Error('Please upload a file')
            error.httpStatusCode = 400
            return next(error)
        }
        res.render('test',{src:path})
    }
    async editProduct(req,res){
        res.render('edit_product')
    }
    async viewProduct(req,res){
        res.render('product_list')
    }
}
module.exports=new ProductController