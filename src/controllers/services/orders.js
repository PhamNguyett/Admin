const {Order,Product}=require('../../database')

const findOrder=async(page,status)=>{
    if(!page){
        page=1;
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
            $match:{
                status:{
                    $in: status
                }
            }
        },
        {
            $sort:{
                createAt:-1,
            },
        },

    ])
    for(let i=0;i<allOrder.length;i++){
        for(let j=0;j<allOrder[i].orderId.length;j++){
            let productInfor=await Product.findOne({_id:allOrder[i].orderId[j].productId})
            allOrder[i].orderId[j].product=productInfor.toObject()
        }
    }

    let filterOrder=[]
    for(let i=(page-1)*10;i<allOrder.length&&i<page*10;i++){
        filterOrder.push(allOrder[i])
    }
    return {
        allOrder:filterOrder,
        currentPage:page,
        quantityPageProduct:(allOrder.length-1)/10 +1
    }
}

module.exports={
    findOrder
}