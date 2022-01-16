const {Order }=require('../database')

const index=async(req,res)=>{
    const allTotal=await Order.find({})
    let total=0;
    for(let i=0;i<allTotal.length;i++) {
        total+=allTotal[i].sum
    }
    let totalBill=allTotal.length
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
    for(let i=0;i<7&&i<=current_day;i++){
        let previousDay= new Date(current_year, current_month,now.getDate()-current_day+i)
        let nextDay= new Date(current_year, current_month,now.getDate()-current_day+i+1)
        let sum = 0;
        let order=await Order.find({createdAt:{$gte:previousDay,$lt:nextDay}})
        console.log(order)
        for(let j=0;j<order.length;j++){
            sum+=order[j].sum
        }
        data.push(sum)
    }
    let totalOrder=await Order.count({createdAt:{$gte:new Date(current_year,current_month,now.getDate()),$lt:new Date(current_year,current_month,now.getDate()+1)}})
    res.render('analysisSale',{
        data:JSON.stringify(data),
        totalIncome:data[data.length-1],
        totalOrder
    })
}
const analysisSaleMonth=async(req,res)=>{
    let data=[]
    var now = new Date();
    let current_day = now.getDate();
    let current_year=now.getFullYear()
    let current_month=now.getMonth()

    let totalOrder=await Order.count({createdAt:{$gte:new Date(current_year,current_month,current_day),$lt:new Date(current_year,current_month,current_day+1)}})
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
    res.render('analysisSaleMonth',{
        data:JSON.stringify(data),
        totalIncome:data[data.length-1],
        totalOrder
    })
}

module.exports={
    index,
    analysisSale,
    analysisSaleMonth
}
