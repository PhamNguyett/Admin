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

const analysisSale=async(req,res)=>{
    let data=[]
    var now = new Date();
    let current_day = now.getDay();
    let current_year=now.getFullYear()
    let current_month=now.getMonth()

    for(let i=0;i<7&&i<current_day;i++){
        let previousDay= new Date(current_year, current_month,now.getDate()-current_day+i+1)
        let nextDay= new Date(current_year, current_month,now.getDate()-current_day+i+2)
        let sum = 0;
        let order=await Order.find({createdAt:{$gte:previousDay,$lt:nextDay}})
        for(let j=0;j<order.length;j++){
            sum+=order[j].sum
        }
        data.push(sum)
    }
    res.render('analysisSale',{
        data:JSON.stringify(data)
    })
}
const analysisSaleMonth=async(req,res)=>{
    let data=[]
    var now = new Date();
    let current_day = now.getDate();
    let current_year=now.getFullYear()
    let current_month=now.getMonth()
    for(let i=0;i<31&&i<current_day;i++){
        let previousDay= new Date(current_year, current_month,i+1)
        let nextDay= new Date(current_year, current_month,i+2)
        let sum = 0;
        let order=await Order.find({createdAt:{$gte:previousDay,$lt:nextDay}})
        for(let j=0;j<order.length;j++){
            sum+=order[j].sum
        }
        data.push(sum)
    }
    console.log(data)
    res.render('analysisSaleMonth',{
        data:JSON.stringify(data)
    })
}

module.exports={
    index,
    analysisSale,
    analysisSaleMonth
}
