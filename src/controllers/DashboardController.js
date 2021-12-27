const Category=require('../database/models/Category')
const Product=require('../database/models/Product')

class DashboardController{
    async index(req,res){
        res.render('dashboard')
    }
    
}
module.exports=new DashboardController