const {User,Comment}=require('../../database')

const allUser=async(isAuth=[true,false])=>{
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
    console.log(allUser)
    return allUser
}

module.exports={
    allUser
}