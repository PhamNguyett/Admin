const {analysicServic}=require('./services')
const {Order_Detail,Product}=require('../database')

const analysisProduct=async(req,res)=>{

    const data=await analysicServic.dashboard()
    res.render('Dashboard',data)
}

module.exports={
    analysisProduct
}