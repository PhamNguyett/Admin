const {Category, Product,Order_Detail}=require('../database')

class DashboardController{
    async index(req,res){
        // const orderDetail=new Order_Detail({
        //     productId:'61d7976a54865080b5706d10',
        //     orderId:'618f75c8189ca6d48160e649',
        //     infor:{
        //         quantity:5,
        //         size:'S'
        //     }
        // })
        // await orderDetail.save()
        res.render('dashboard')
    }
    
}
module.exports=new DashboardController