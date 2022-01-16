<<<<<<< HEAD
const {Order,User, Product, Comment}=require('../database')
const {orderServic}=require('./services')
=======
const {analysicServic}=require('./services')
const {Order_Detail,Product}=require('../database')
>>>>>>> main

const analysisProduct=async(req,res)=>{

    const data=await analysicServic.dashboard()
    res.render('Dashboard',data)
}
<<<<<<< HEAD
=======

>>>>>>> main
module.exports={
    analysisProduct
}