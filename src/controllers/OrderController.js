const {Order, Order_Detail, Product}=require('../database')
const {orderServic}=require('./services')

const index=async(req,res)=>{
    try{
        let data=await orderServic.findOrder(req.query.page,[-1,0,1])
        res.render('order',data)
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}

const waiting=async(req,res)=>{
    try{
        let data=await orderServic.findOrder(req.query.page,[-1])
        res.render('order',data)
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}

const delivery=async(req,res)=>{
    try{
        let data=await orderServic.findOrder(req.query.page,[0])
        res.render('order',data)
    }
    catch(e){
        console.log(e)
        res.render('404')
    }

}

const accept=async(req,res)=>{
    try{
        const accOrder = await Order.findOne({_id:req.params.id,status:-1})
        if(accOrder)
        {
            accOrder.status = 0
            await accOrder.save()
            let allDetail=await Order_Detail.find({orderId:accOrder._id})
            allDetail.forEach(async(item)=>{
                let updateProduct=await Product.findOne({_id:item.productId})
                for(let i=0;i<updateProduct.info.length;i++){
                    if(updateProduct.info[i].size===item.infor.size){
                        updateProduct.info[i].quantity-=item.infor.quantity
                    }
                }
                await updateProduct.save()
            })
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
const transport=async(req,res)=>{
    try{
        const accOrder = await Order.findOne({_id:req.params.id,status:0})
        if(accOrder)
        {
            accOrder.status = 1
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

module.exports={
    index,
    waiting,
    delivery,
    accept,
    transport
}