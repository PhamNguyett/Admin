const Order=require('../database/models/Order')
const {MultipleMongooseToObject,MongooseToObject}=require('../ultil/mongoose')
class OrderController{
    async index(req,res){
        try{
            const allOrder = await Order.find({})
            res.render('order',{
                allOrder:MultipleMongooseToObject(allOrder),
            })
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }
}
module.exports=new OrderController