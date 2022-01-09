const {Order,Order_Detail}=require('../database')
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
        let nameProduct=[]
        const allOrder = await Order.find({}).populate('user')
        const allOrderDetail = await Order_Detail.find({}).populate('productId').populate('orderId')
        for(let i=0; i<allOrderDetail.length;i++){
            nameProduct.push(allOrderDetail[i].productId.name)
        }
        let filterOrder=[]
        console.log(allOrderDetail)
        for(let i=(page-1)*10;i<allOrder.length&&i<page*10;i++){
            filterOrder.push(allOrder[i])
        }
        res.render('order',{
            allOrder:MultipleMongooseToObject(filterOrder),
            allOrderDetail:JSON.stringify(nameProduct),
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

module.exports={
    index,
    waiting,
    processed,
    accept
}