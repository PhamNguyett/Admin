
const Product =require('../database/models/Product')
const caterology=require('../ultil/caterology')
const {MultipleMongooseToObject, MongooseToObject}=require('../ultil/mongoose')
const {quantityPageProducts,findProduct,addKeyObject}=require('./services/product')

class ProductController{
    async addProduct(req,res){   // get
        res.render('add_product',{caterology:caterology})
    }

    async caterology(req,res){
        try{
            if(req.query.key){
                let quantityPageProduct= await quantityPageProducts(req.query.key,req.params.slug)
                if(!req.query.page){
                    let filterProduct =await findProduct(req.query.key,req.params.slug)
                    addKeyObject(filterProduct,'currentPage',1)
                    res.render('product_list',{caterology,allProduct:filterProduct,quantityPageProduct})
                    return 
                }
                let page=parseInt(req.query.page)
                let pageProduct=await findProduct(req.query.key,req.params.slug,page)
                addKeyObject(pageProduct,'currentPage',page)
                res.render('product_list',{caterology,allProduct:pageProduct,quantityPageProduct})
                return
            }

            let quantityPageProduct= await quantityPageProducts(null,req.params.slug)
            if(req.query.page){
                let page=parseInt(req.query.page)
                let pageProduct=await Product.findWithDeleted({type:req.params.slug}).limit(10).skip(page*10-10)
                pageProduct=MultipleMongooseToObject(pageProduct)
                addKeyObject(pageProduct,'currentPage',page)
                res.render('product_list',{caterology,allProduct:pageProduct,quantityPageProduct})
                return
            }

            let pageProduct=await Product.findWithDeleted({type:req.params.slug}).limit(10)
            pageProduct=MultipleMongooseToObject(pageProduct)
            addKeyObject(pageProduct,'currentPage',1)
            res.render('product_list',{allProduct:pageProduct,caterology,quantityPageProduct})
        }
        catch(e){
            console.log(e)
            res.render('404')
        }
    }

    async createProduct(req,res){ // post product

        var type=[]
        caterology.forEach((item)=>{
            if(req.body[item]){
                type.push(item)
            }
        })
        var path=[]

        req.files.forEach(i=>{
            path.push('/uploads/'+i.filename)
        })
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
            const product=await Product.findOneWithDeleted({slug:req.params.slug})
            res.render('edit_product',{product:MongooseToObject(product),caterology})
        }
        catch(e){
            render('404')
        }
    }
    async saveEditProduct(req,res){  // post edit product

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
            product.save()
            res.render('detail-product',{product:MongooseToObject(product)})
        }catch(e){
            res.json({succes:false})
        }
        
    }
    
    async viewProduct(req,res){ // get all product       
        try{

            if(req.query.key){
                let quantityPageProduct= await quantityPageProducts(req.query.key)
                if(!req.query.page){
                    let filterProduct =await findProduct(req.query.key)
                    addKeyObject(filterProduct,'currentPage',1)
                    res.render('product_list',{caterology,allProduct:filterProduct,quantityPageProduct})
                    return 
                }
                let page=parseInt(req.query.page)
                let pageProduct=await findProduct(req.query.key,null,page)
                addKeyObject(pageProduct,'currentPage',page)
                res.render('product_list',{caterology,allProduct:pageProduct,quantityPageProduct})
                return
            }

            let quantityPageProduct= await quantityPageProducts()
            if(req.query.page){
                let page=parseInt(req.query.page)
                let pageProduct=await Product.findWithDeleted({}).limit(10).skip(page*10-10)
                pageProduct=MultipleMongooseToObject(pageProduct)
                addKeyObject(pageProduct,'currentPage',page)
                res.render('product_list',{caterology,allProduct:pageProduct,quantityPageProduct})
                return
            }

            let pageProduct=await Product.findWithDeleted({}).limit(10)
            pageProduct=MultipleMongooseToObject(pageProduct)
            addKeyObject(pageProduct,'currentPage',1)
            res.render('product_list',{allProduct:pageProduct,caterology,quantityPageProduct})
        }
        catch(e){
            res.render('404')
        }
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
            res.json({succes:false,message:'thang ne'})
        }
    }
    
    async detail(req,res){
        try{
            const product= await Product.findOneWithDeleted({slug:req.params.slug})
            if(product){
                res.render('detail-product',{product:MongooseToObject(product)})
                return
            }           
            res.render('404')

        }catch(e){
            console.log(e)
            
        }
    }
}
module.exports=new ProductController