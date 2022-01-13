const {Order_Detail}=require('../../database')

const analysisProducts=async()=>{
    let allDetail=await Order_Detail.aggregate([
        {
            $match:{
                status:1
            }
        },
        // {
        //     $group:{
        //         _id:$name,
        //         total:{$sum:"$infor.quantity"}
        //     }
        // }
    ])
    return allDetail
}

module.exports={
    analysisProducts
}