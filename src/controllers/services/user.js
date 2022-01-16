const {User,Comment}=require('../../database')

const allUser=async(isAuth=[true,false],req)=>{
    let {page}=req.query
        if(!page){
            page=1
        }
        else{
            page=parseInt(page)
        }
    const allUser = await User.aggregate([
        {
            $lookup:{
                from:'orders',
                localField:'_id',
                foreignField:'user',
                as:'order'
            }
        },
        {
            $match:{
                isAuth:{
                    $in: isAuth
                }
            }
        }
    ])
    for(let i=0;i<allUser.length;i++){
        allUser[i].comments=await Comment.count({user:allUser[i]._id})
    }
    let result={
        currentPage:page,
        quantity:(allUser.length-1)/8 +1,
        filterUser:[]
    }

    for(let i=(page-1)*8;i<allUser.length&&i<page*8;i++){
        result.filterUser.push(allUser[i])
    }

    console.log(result.filterUser)
    return result
}


module.exports={
    allUser
}