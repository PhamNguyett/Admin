const User=require('../database/models/User')
const {MultipleMongooseToObject,MongooseToObject}=require('../ultil/mongoose')
class UserController{
    async index(req,res){
        try{
            const allUser = await User.find({})
            res.render('user_management',{
                allUser:MultipleMongooseToObject(allUser),
            })
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }
}
module.exports=new UserController
