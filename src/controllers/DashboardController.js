const {Category, Product}=require('../database')

class DashboardController{
    async index(req,res){
        res.render('dashboard')
    }
    
}
module.exports=new DashboardController