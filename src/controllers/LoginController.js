const publicFolder=require('../../public/url')
const Admin=require('../database/models/Admin')
const argon2=require('argon2')

class LoginController{
    
    async login(req,res){
        res.sendFile(publicFolder+'/login.html')
    }
    async reset(req,res){
        res.sendFile(publicFolder+'/resetpassword.html')
    }
    
}
module.exports=new LoginController