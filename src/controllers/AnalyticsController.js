const {Order}=require('../database')
const {MultipleMongooseToObject,MongooseToObject} = require("../ultil/mongoose")

const index=async(req,res)=>{
    const allTotal=await Order.find({})
    let total=0;
    for(let i=0;i<allTotal.length;i++) {
        total+=allTotal[i].sum
    }
    let totalBill=allTotal.length
    console.log(total)
    res.render('analytics',{
        sumOfTotal: total,
        totalBill: totalBill
    })
}

module.exports={
    index
}
