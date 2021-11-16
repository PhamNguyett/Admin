class AddProductController{
    async index(req,res){
        res.render('add_product')
    }
    
}
module.exports=new AddProductController