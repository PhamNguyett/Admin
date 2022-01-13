const slug = require('mongoose-slug-generator');
const mongoose_delete = require('mongoose-delete');
const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Product=new Schema({
    name:{required:true,type:String},
    price:{type:Number,required:true},
    pricePromotion:{type:Number},
    des:{type:String},
    info:[{color:{type:String},size:{type:String},quantity:{type:Number},_id:false}],
    gender:[{type:String}],
    quantitySold:{type:Number,default:0},
    imagesUrl:[{type:String}],
    rating:{point:Number,quantity:Number},
    categoryId:[{type:Schema.Types.ObjectId,ref:'Category'}],
    slug:{type:String,slug:"name",unique:true},
},{timestamps:true})

Product.plugin(mongoose_delete,{ deletedAt : true , overrideMethods: 'all'});
mongoose.plugin(slug);

module.exports=mongoose.model('Product',Product)