const publicFolder=require('../public/url')

class LoginController{
    async Login(req,res){
        console.log(req.query)
        res.sendFile(publicFolder+'/login.html')
    }
    async Reset(req,res){
        res.sendFile(publicFolder+'/resetpassword.html')
    }
}
module.exports=new LoginController