class ProductListController{
    index(req,res){
        res.render('product_list')
    }
}
module.exports=new ProductListController