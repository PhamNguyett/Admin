const Admin = require('../database/models/Admin')
const {MultipleMongooseToObject,MongooseToObject} = require("../ultil/mongoose")
const argon2=require('argon2')
class AdminController{
    async show(req,res){
        const admins = await Admin.find({ })
        res.render('admin',{admins:MultipleMongooseToObject(admins)})
    }

    async detail(req,res){
        try{
            const admin= await Admin.findOne({slug:req.params.slug})
            if(admin){
                res.render('detail-admin',{admin:MongooseToObject(admin)})
                return
            }           
            res.render('404')

        }catch(e){
            console.log(e)
            
        }

    }

    // [GET] admin/add
    async add(req,res){
        res.render('add_admin')

    }

    //[POST] admin/add
    async save(req, res){
        let avatarUrl='/uploads/'+req.file.filename
        console.log(req.file)
        console.log(req.body)
        const newPassword=await argon2.hash(req.body.password)
        const newAdmin = new Admin({ 
            username:req.body.username,
            password:newPassword,
            gmail:req.body.gmail,
            name:req.body.name,
            avatarUrl:avatarUrl,
            adminname:'sdfsdf'
        })
        console.log(newAdmin)
        const err=await newAdmin.save()
        console.log(err)
        res.render('admin')
        
    }

}
module.exports=new AdminController
