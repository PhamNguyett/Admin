const Order=require('../database/models/Order')
const {MultipleMongooseToObject,MongooseToObject}=require('../ultil/mongoose')
class OrderController{
    async index(req,res){
        try{
            const order = await Order.find({})
            res.render('order',{
                order:MultipleMongooseToObject(order),
            })
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }
}
module.exports=new OrderController