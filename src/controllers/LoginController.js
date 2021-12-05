const publicFolder=require('../../public/url')
const Admin=require('../database/models/Admin')
const argon2=require('argon2')

class LoginController{
    
    async login(req,res){
        // const password=await argon2.hash("nguyetchuot.12");
        // const admin = new Admin({ 
        //     username:"nguyetchuot",
        //     password:password,
        //     gmail:"nguyetchuot15@gmail.com",
        //     name:"nguyetchuot"})
        // await admin.save();
        res.sendFile(publicFolder+'/login.html')
    }
    async reset(req,res){
        res.sendFile(publicFolder+'/resetpassword.html')
    }
    
}
module.exports=new LoginController