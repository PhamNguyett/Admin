const {analysicServic}=require('./services')

const analysisProduct=async(req,res)=>{
    const data=await analysicServic.dashboard()
    res.render('dashboard',data)
}

module.exports={
    analysisProduct
}