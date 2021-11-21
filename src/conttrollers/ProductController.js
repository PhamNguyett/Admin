const Product =require('../database/models/Product')
class ProductController{
    async addProduct(req,res){   // get
        res.render('add_product')
    }
    async createProduct(req,res){ // post
        console.log(req.body)
        const file = req.file
        const path='/uploads/'+file.filename
        const newProduct=new Product({...req.body})
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
    async viewProduct(req,res){ // get
        try{
            const allProduct=await Product.find({})
            res.render('product_list',{allProduct})
        }
        catch(e){
            res.render('404')
        }
    }
}
module.exports=new ProductController