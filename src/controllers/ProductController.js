
const Product =require('../database/models/Product')
const Category=require('../database/models/Category')
const {MultipleMongooseToObject, MongooseToObject}=require('../ultil/mongoose')
const {findProductList,createInfoProduct}=require('./services/product')

class ProductController{
    async addProduct(req,res){ 
        const category=await Category.find({})  
        res.render('addProduct',{
            category:MultipleMongooseToObject(category)
        })
    }
    async caterology(req,res){
        let category=await Category.find({})
        let {page,key}=req.query
        let {slug}=req.params
        if(!page){
            page=1
        }
        else{
            page=parseInt(page)
        }
        if(!key){
            key=' '
        }
        const result=await findProductList(page,key,slug)
        return res.render('productList',{
            category:MultipleMongooseToObject(category),
            allProduct:MultipleMongooseToObject(result.filterProduct),
            quantityPageProduct:(result.quantity-1)/10+1,
            nameProduct:slug.toUpperCase(),
            currentPage:page
        })
    }
    async createProduct(req,res){ // post product
        let result=createInfoProduct(req.body)
        var path=[]
        req.files.forEach(i=>{
            path.push('/uploads/'+i.filename)
        })
        
        const newProduct= new Product({
            name:req.body.name,
            price:parseInt(req.body.price),
            pricePromotion:parseInt(req.body.pricePromotion),
            des:req.body.description,
            imagesUrl:path,
            info:result.info,
            categoryId:result.categoryId,
        })
        try{
            await newProduct.save()
            res.render('detailProduct',{
                product:MongooseToObject(newProduct)
            })
        }
        catch (err){
            res.render('404')
        }
    }
    async editProduct(req,res){
        try{
            const product=await Product.findOneWithDeleted({slug:req.params.slug})
            const category=await Category.find({})
            console.log(product)
            res.render('editProduct',{
                product:MongooseToObject(product),
                category:MultipleMongooseToObject(category)})
        }
        catch(e){
            render('404')
        }
    }
    async saveEditProduct(req,res){  // post edit product
        let result=createInfoProduct(req.body)
        try{
            const product=await Product.findOneWithDeleted({slug:req.params.slug})
            product.categoryId=result.categoryId
            product.imagesUrl=req.body.imageUpload
            req.files.forEach(i=>{
                product.imagesUrl.push('/uploads/'+i.filename)
            })
            product.name=req.body.name,
            product.price=parseInt(req.body.price),
            product.pricePromotion=parseInt(req.body.pricePromotion),
            product.des=req.body.description,
            product.info=result.info,

            product.save()
            res.render('detailProduct',{
                product:MongooseToObject(product)
            })
        }catch(e){
            res.render('404')
        }
        
    }
    async viewProduct(req,res){ // get all product    
        let category=await Category.find({})
        let {page,key}=req.query
        if(!page){
            page=1
        }
        else{
            page=parseInt(page)
        }
        if(!key){
            key=' '
        }
        const result=await findProductList(page,key,'')
        return res.render('productList',{
            category:MultipleMongooseToObject(category),
            allProduct:MultipleMongooseToObject(result.filterProduct),
            quantityPageProduct:(result.quantity-1)/10+1,
            currentPage:page,
            nameProduct:'ALL PRODUCT'
        })
    }
    async deleteProduct(req,res){
        try{
            const product =await Product.delete({_id:req.params.id})
            res.json({success:true})
        }
        catch(e){
            res.json({success:false})
        }
    }
    async restore(req,res){
        try{
            const result=await Product.restore({_id:req.params.id})
            res.json({success:true})
        }catch(e){
            res.json({succes:false,message:'fail'})
        }
    }
    async detail(req,res){
        try{
            const product= await Product.findOneWithDeleted({slug:req.params.slug})
            console.log(product)
            if(product){
                return res.render('detailProduct',{
                    product:MongooseToObject(product)
                })
            }           
            res.render('404')
        }catch(e){
            console.log(e)
            
        }
    }
}
module.exports=new ProductController