class ProductController{
    async addProduct(req,res){
        console.log(req.query)
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