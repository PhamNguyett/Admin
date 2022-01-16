const {Admin} = require('../database')
const {MultipleMongooseToObject,MongooseToObject} = require("../ultil/mongoose")
const argon2=require('argon2')

const show=async(req,res)=>{
    const admins = await Admin.find({})
    res.render('admin',{admins:MultipleMongooseToObject(admins)})
}

const detail=async(req,res)=>{
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
 const add =async (req,res)=>{
    res.render('addAdmin')
}

//[POST] admin/add
const save=async(req, res)=>{
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
    const admins=await Admin .find({})

    res.render('admin',{admins:MultipleMongooseToObject(admins)})
    
}

const edit= async(req,res)=>{
    const editAdmin= await Admin.findById(req.params.id)
    if(editAdmin){
        res.render('editProfile',MongooseToObject(editAdmin))
    }
    else{
        res.render('404')
    }

}

const saveEdit = async(req,res)=>{
    try{
        const admin=await Admin.findById(req.params.id)
        if(req.file){
            admin.avatarUrl='/uploads/'+req.file.filename
        }
        admin.gmail=req.body.gmail,
        admin.phone=req.body.phone,
        admin.name=req.body.name,
        await admin.save()
        res.render('detailAdmin',{
            admin:MongooseToObject(admin)
        })
        
    }catch(e){
        res.render('404')
    }
}

const changePassword=async(req,res)=>{
    const editAdmin= await Admin.findById(req.params.id)
    if(editAdmin){
        res.render('changePassword',MongooseToObject(editAdmin))
    }
    else{
        res.render('404')
    }

}

const saveChangePassword=async(req,res)=>{
    const{oldPassword, newPassword}=req.body
    try{
        const admin=await Admin.findById(req.params.id)
        let isValidPassword=await argon2.verify(req.user.password,oldPassword)
        if(isValidPassword){
            admin.password=await argon2.hash(newPassword)
            await admin.save()
            return res.render('detailAdmin',{
                message:'Change password successfully',
                admin:MongooseToObject(admin)
            })
        }
        else{
            res.render('404',{message:'Current password is wrong !! '})
        }
    }
    catch(e){
        res.render('404')
    }
}

module.exports={
    show,
    detail,
    add,
    save,
    edit,
    saveEdit,
    changePassword,
    saveChangePassword
}
