const {Product,User,Order,Comment}=require('../../database')

const dashboard=async()=>{
    const allDetail=await Product.find({}).sort({quantitySold:-1}).limit(10)
    const allOrder=await Order.find({})
    const allUser= await User.find({})
    const allComment=await Comment.find({})
    let totalIncome=0
    let totalOrder=allOrder.length
    let totalUser=allUser.length
    let totalComment=allComment.length
    for(let i=0; i<allOrder.length; i++){
        totalIncome += allOrder[i].sum
    }
    let data=allDetail.map(item=>{
        return {
            name:item.name,
            quantitySold:item.quantitySold
        }
    })
    return {
        allDetail:JSON.stringify(data),
        totalIncome:totalIncome,
        totalOrder:totalOrder,
        totalUser:totalUser,
        totalComment:totalComment
    }
}

module.exports={
    dashboard
}