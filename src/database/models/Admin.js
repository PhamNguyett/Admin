const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Admin=new Schema({
    username:{required:true,type:String,unique:true},
    password:{required:true,type:String},
    gmail:{type:String,required:true},
    name:{type:String ,require:true},
    avatarUrl:{type:String, default:'/img/avatar.png'}
},{timestamps:true})
module.exports=mongoose.model('Admin',Admin)