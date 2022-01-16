const mongoose=require('mongoose')
const Schema = mongoose.Schema;

const Comment=new Schema({
    user:{type:Schema.Types.ObjectId,required:true,ref:'User'},
    product:{type:Schema.Types.ObjectId,required:true,ref:'Product'},
    content:{type:String},
},{timestamps:true})
module.exports=mongoose.model('Comment',Comment)