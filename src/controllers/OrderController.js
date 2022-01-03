const { accessSync } = require('fs')
const Order=require('../database/models/Order')
const {MultipleMongooseToObject,MongooseToObject}=require('../ultil/mongoose')
class OrderController{
    async index(req,res){
        try{
            const allOrder = await Order.find({}).populate('user')
            console.log(allOrder)
            res.render('order',{
                allOrder:MultipleMongooseToObject(allOrder),
            })
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }

    async waiting(req,res){
        try{
            const waitingOrder = await Order.find({status:false})
            res.render('order',{
                allOrder:MultipleMongooseToObject(waitingOrder),
            })
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }
    
    async processed(req,res){
        try{
            const proOrder = await Order.find({status:true})
            res.render('order',{
                allOrder:MultipleMongooseToObject(proOrder)
            })
        }
        catch(e){
            console.log(e)
            res.render('404')
        }

    }

    async accept(req,res){
        try{
            const accOrder = await Order.findOne({_id:req.params.id,status:false})
            console.log(req.params)
            console.log(accOrder)
            if(accOrder)
            {
                accOrder.status = true
                await accOrder.save()
                res.status(200).json({success:true})
            }
            else{
                res.status(404).json({success:false,message:"Invalid order"})
            }

        }
        catch(e){
            res.status(404).json({success:false})
        }
    }
}
module.exports=new OrderController