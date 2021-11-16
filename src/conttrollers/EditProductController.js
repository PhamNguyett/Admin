class EditProductController{
    async index(req,res){
        res.render('edit_product')
    }
    
}
module.exports=new EditProductController