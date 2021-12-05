const Admin = require("../database/models/Admin")
const {MultipleMongooseToObject,MongooseToObject} = require("../ultil/mongoose")
const publicURL=require('../../public/url')
const multer = require('multer');
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
        const formData =req.body
        formData.avatarUrl='/uploads/'+req.file.filename
        const admin =new Admin(formData)
        admin.save();
        console.log(req.body)
    }

}
module.exports=new AdminController
