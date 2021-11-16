class AllProductController{
    async index(req,res){
        res.render('all_products')
    }
    
}
module.exports=new AllProductController