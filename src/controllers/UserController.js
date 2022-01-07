const {User}=require('../database')
const {MultipleMongooseToObject,MongooseToObject}=require('../ultil/mongoose')

const index=async (req,res)=>{
    try{
        const allUser = await User.find({})
        res.render('userManagement',{
            allUser:MultipleMongooseToObject(allUser),
        })
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}

module.exports={
    index
}
