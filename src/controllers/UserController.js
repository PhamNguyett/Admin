const {User}=require('../database')
const {userServic}=require('./services')

const index=async (req,res)=>{
    try{
        const allUser = await userServic.allUser([false,true],req)
        res.render('userManagement',{
            allUser:allUser.filterUser,
            quantityPage:allUser.quantity,
            curPage:allUser.currentPage
        })
    }
    catch(e){
        res.render('404')
    }
}

const userBlock=async (req,res)=>{
    try{
        
        const allUser = await userServic.allUser([false],req)
        res.render('userManagement',{
            allUser:allUser.filterUser,
            quantityPage:allUser.quantity,
            curPage:allUser.currentPage
        })
    }
    catch(e){
        res.render('404')
    }
}

const block=async(req,res)=>{
    try{
        const findUser=await User.updateOne({_id:req.params.id},{isAuth:false})
        res.status(200).json({success:true})
    }
    catch(e){
        res.status(400).json({success:false,message:'user không tồn tại'})
    }
    
}

const unblock=async(req,res)=>{
    try{
        
        const findUser=await User.updateOne({_id:req.params.id},{isAuth:true})
        const allUser = await userServic.allUser([true],req)
        res.render('userManagement',{
            allUser:allUser.filterUser,
            quantityPage:allUser.quantity,
            curPage:allUser.currentPage
        })
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
    
}

module.exports={
    index,
    block,
    unblock,
    userBlock
}
