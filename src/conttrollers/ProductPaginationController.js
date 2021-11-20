class ProductPaginationController{
    async index(req,res){
        res.render('product_pagination')
    }
    
}
module.exports=new ProductPaginationController