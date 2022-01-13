const {Order,Order_Detail,Product}=require('../database')
const {MultipleMongooseToObject,MongooseToObject}=require('../ultil/mongoose')

const index=async(req,res)=>{
    try{
        let {page}=req.query
        if(!page){
            page=1
        }
        else{
            page=parseInt(page)
        }
        const allOrder=await Order.aggregate([
            {
                $lookup: {
                    from: "order_details", // collection name in db
                    localField: "_id",
                    foreignField: "orderId",
                    as:'orderId'
                },
                
            },
            {
                $sort:{
                    createAt:-1,
                },
            }
            
        ])

        console.log(allOrder)
        for(let i=0;i<allOrder.length;i++){
            for(let j=0;j<allOrder[i].orderId.length;j++){
                let productInfor=await Product.findOne({_id:allOrder[i].orderId[j].productId}).sort({'createdAt':-1})
                allOrder[i].orderId[j].product=productInfor.toObject()
            }
        }
        console.log(allOrder[0].orderId)
        console.log(allOrder[1].orderId)
        console.log(allOrder[2].orderId)

        let filterOrder=[]
        for(let i=(page-1)*10;i<allOrder.length&&i<page*10;i++){
            filterOrder.push(allOrder[i])
        }
        res.render('order',{
            allOrder,
            quantityPageProduct:(allOrder.length-1)/10 +1,
            currentPage:page
        })
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}

const waiting=async(req,res)=>{
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

const processed=async(req,res)=>{
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

const accept=async(req,res)=>{
    try{
        const accOrder = await Order.findOne({_id:req.params.id,status:-1}).sort({createAt:-1})
        if(accOrder)
        {
            accOrder.status = 0
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
    processed,
    accept
}