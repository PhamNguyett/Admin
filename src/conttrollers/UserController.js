
class UserController{
    async index(req,res){
        res.render('user_management')
    }
}
module.exports=new UserController