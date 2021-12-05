const Admin = require("../database/models/Admin")
const {MultipleMongooseToObject,MongooseToObject} = require("../ultil/mongoose")

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
    async list(req, res, next){}

}
module.exports=new AdminController
