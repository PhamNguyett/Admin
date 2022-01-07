const mongoose = require('mongoose');
connect=async()=>{
    try{
        await mongoose.connect(process.env.DB_URL,{
            
        })
        console.log('connect database successfully')
    }catch(err){
        console.log(err)
    }

}
const Admin=require('./models/Admin')
const Category=require('./models/Category')
const CodeDiscount=require('./models/CodeDiscount')
const Comment=require('./models/Comment')
const Order=require('./models/Order')
const Product=require('./models/Product')
const Ratting=require('./models/Ratting')
const User=require('./models/User')
module.exports={
    connect,
    Admin,
    Category,
    CodeDiscount,
    Comment,
    Order,
    Product,
    Ratting,
    User
}

