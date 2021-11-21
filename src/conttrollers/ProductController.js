const formidable = require('formidable');
class ProductController{
    async addProduct(req,res){
        const form = formidable();
        
        res.render('add_product')
    }
    async creaProduct(req,res){
        console.log(req.body)
        
        res.render('add_product')
    }
    async editProduct(req,res){
        res.render('edit_product')
    }
    async viewProduct(req,res){
        res.render('product_list')
    }
    
}
module.exports=new ProductController