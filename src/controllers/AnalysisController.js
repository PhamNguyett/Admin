const {Order,Order_Detail, Product}=require('../database')
const {orderServic}=require('./services')

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
const analysisProduct=async(req,res)=>{
    const allDetail=await Product.find({}).sort({quantitySold:-1}).limit(10)
    let data=allDetail.map(item=>{
        return {
            name:item.name,
            quantitySold:item.quantitySold
        }
    })
    res.render('analysicProduct',{
        allDetail:JSON.stringify(data)
    })
}

module.exports={
    index,
    analysisProduct
}
