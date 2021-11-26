
const Product =require('../database/models/Product')
const caterology=require('../ultil/caterology')
const {MultipleMongooseToObject, MongooseToObject}=require('../ultil/mongoose')
class ProductController{
    async addProduct(req,res){   // get
        res.render('add_product',{caterology:caterology})
    }

    async caterology(req,res){
        const allProduct=await Product.findWithDeleted({type:req.params.slug})
        res.render('product_list',{allProduct:MultipleMongooseToObject(allProduct),caterology})
    }

    async createProduct(req,res){ // post product
        console.log(req.body)
        var type=[]
        caterology.forEach((item)=>{
            if(req.body[item]){
                type.push(item)
            }
        })
        var path=[]
        console.log(req.files)
        req.files.forEach(i=>{
            path.push('/uploads/'+i.filename)
        })
        console.log(path)
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
        const newProduct=new Product({...product})
        try{
            await newProduct.save()
            res.render('detail-product',{product:MongooseToObject(newProduct)})
        }
        catch (err){
            res.render('404')
        }
    }

    async editProduct(req,res){
        try{
            console.log(req.params.slug)
            const product=await Product.findOneWithDeleted({slug:req.params.slug})
            res.render('edit_product',{product:MongooseToObject(product),caterology})
        }
        catch(e){
            render('404')
        }
    }
    async saveEditProduct(req,res){  // post edit product
        console.log(req.body)

        var type=[]
        caterology.forEach((item)=>{
            if(req.body[item]){
                type.push(item)
            }
        })

        try{
            const product=await Product.findOneWithDeleted({slug:req.params.slug})
            product.type=type
            product.imagesUrl=req.body.imageUpload
            req.files.forEach(i=>{
                product.imagesUrl.push('/uploads/'+i.filename)
            })
            product.name=req.body.name,
            product.price=parseInt(req.body.price),
            product.pricePromotion=parseInt(req.body.pricePromotion),
            product.des=req.body.description,
            product.info=[{
                color:req.body.color,
                size:req.body.size,
                quantity:req.body.quantity
            }],
            console.log(product)
            product.save()
            res.render('detail-product',{product:MongooseToObject(product)})
        }catch(e){
            res.json({succes:false})
        }
        
    }
    
    async viewProduct(req,res){ // get all product
        try{
            var allProduct=await Product.findWithDeleted({})
            allProduct=MultipleMongooseToObject(allProduct)
            if(req.query.key){
                let filterProduct=[]
                allProduct.forEach(item=>{
                    if (item.name.toLowerCase().indexOf(req.query.key.toLowerCase())>=0){
                        filterProduct.push(item)
                    }
                })
                res.render('product_list',{caterology:caterology,allProduct:filterProduct})
                return 
            }
            
            res.render('product_list',{allProduct:allProduct,caterology})
        }
        catch(e){
            res.render('404')
        }
    }
    async deleteProduct(req,res){
        console.log(req.params.id)
        try{
            const product =await Product.delete({_id:req.params.id})
            console.log(product)
            res.json({success:true})
        }
        catch(e){
            res.json({success:false})
        }
    }
    async restore(req,res){
        console.log(req.params.id)
        try{
            const result=await Product.restore({_id:req.params.id})
            console.log(result)
            res.json({success:true})
        }catch(e){
            res.json({succes:false,message:'thang ne'})
        }
    }
    
    async detail(req,res){
        try{
            const product= await Product.findOneWithDeleted({slug:req.params.slug})
            if(product){
                res.render('detail-product',{product:MongooseToObject(product)})
            }
            else{
                res.render('404')
            }
        }catch(e){
            console.log(e)
        }
    }
}
module.exports=new ProductController