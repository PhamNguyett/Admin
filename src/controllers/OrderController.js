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
        let DetailProduct=[]
        let num=[]
        let allOrder = await Order.find({}).populate('user')
        let allOrderEl = await Order_Detail.find({}).populate('productId')
        let allOrderDetail = await Order_Detail.find({}).populate('productId').populate('orderId')
        for(let i=0;i<allOrder.length;i++)
        {
            num[i]=0;
        }
        for(let i=0;i<allOrder.length;i++){
            for(let j=0;j<allOrderEl.length;j++)
            {
                if(`${allOrder[i]._id}`==`${allOrderEl[j].orderId}`){
                num[i]++;
            }}
        }
        console.log(num)
        for(let i=0; i<allOrderDetail.length;i++){
            DetailProduct.push(allOrderDetail[i].productId)
        }

        let filterOrder=[]
        for(let i=(page-1)*10;i<allOrder.length&&i<page*10;i++){
            filterOrder.push(allOrder[i])
        }
        allOrder=MultipleMongooseToObject(filterOrder),
        // allOrder.data=DetailProduct
        
        // allOrder.insert( { data:DetailProduct} )
        // console.log(allOrder.address)
        res.render('order',{
            allOrder,
            DetailProduct:JSON.stringify(DetailProduct),
            num:JSON.stringify(num),
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