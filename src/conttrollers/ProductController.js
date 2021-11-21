const Product =require('../database/models/Product')
const caterology=require('../ultil/caterology')
const {MultipleMongooseToObject}=require('../ultil/mongoose')
class ProductController{
    async addProduct(req,res){   // get
        console.log('da vo day')
        res.render('add_product',{caterology:caterology})
    }
    async createProduct(req,res){ // post
        console.log(req.body)
        var type=[]
        caterology.forEach((item)=>{
            if(req.body[item]){
                type.push(item)
            }
        })
        const file = req.file
        const path='/uploads/'+file.filename
        const product={
            name:req.body.name,
            price:parseInt(req.body.price),
            pricePromotion:parseInt(req.body.pricePromotion),
            des:req.body.description,
            imagesUrl:path,
            info:[{
                color:req.body.color,
                size:req.body.size,
                quantity:req.body.quantity
            }],
            type:type,
        }
        console.log(product)
        const newProduct=new Product({...product})
        try{
            await newProduct.save()
            res.render('test',{src:path,product})
        }
        catch (err){
            res.render('404')
        }
    }
    async editProduct(req,res){
        res.render('edit_product')
    }
    async viewProduct(req,res){ // get
        try{
            const allProduct=await Product.find({})
            res.render('product_list',{allProduct:MultipleMongooseToObject(allProduct),caterology})
        }
        catch(e){
            res.render('404')
        }
    }
}
module.exports=new ProductController