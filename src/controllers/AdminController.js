const Admin = require('../database/models/Admin')
const {MultipleMongooseToObject,MongooseToObject} = require("../ultil/mongoose")
const argon2=require('argon2')

class AdminController{
    async show(req,res){
        const admins = await Admin.find({})
        res.render('admin',{admins:MultipleMongooseToObject(admins)})
    }

    async detail(req,res){
        try{
            const admin= await Admin.findById(req.params.id)
            if(admin){
                res.render('detailAdmin',{admin:MongooseToObject(admin)})
                return
            }           
            res.render('404')

        }catch(e){
            console.log(e)
            res.render('404')
        }

    }

    // [GET] admin/add
    async add(req,res){
        res.render('addAdmin')

    }

    //[POST] admin/add
    async save(req, res){
        const findAdmin=await Admin.findOne({username:req.body.username})
        if(findAdmin){
            res.render('addAdmin',{message:'username is existed, please choose another username',username:req.body.username,fullname:req.body.name})
            return
        }
        let avatarUrl=''
        if(req.file){
            avatarUrl='/uploads/'+req.file.filename
        }

        const newPassword=await argon2.hash(req.body.password)
        const newAdmin = new Admin({ 
            username:req.body.username,
            password:newPassword,
            gmail:req.body.gmail,
            phone:req.body.phone,
            name:req.body.name,
        })
        if(avatarUrl){
            newAdmin['avatarUrl']=avatarUrl
        }
        await newAdmin.save()
        const admins=await Admin.find({})

        res.render('admin',{admins:MultipleMongooseToObject(admins)})
        
    }

}
module.exports=new AdminController
