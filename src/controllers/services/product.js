const Product=require('../../database/models/Product')
const {MultipleMongooseToObject, MongooseToObject}=require('../../ultil/mongoose')

const quantityPageProducts=async (key,category)=>{
    if (key){
        if(category){
            var quantity = await findProduct(key,category)
            quantity=quantity.length
        }
        else{
            var quantity=await await findProduct(key)
            quantity=quantity.length
        }
    }
    else{
        if(category){
            var quantity = await Product.count({type:category})
        }
        else{

            var quantity = await Product.count({})
        }
    }
    return parseInt(quantity/10)+1
}

const findProduct=async (key,category,page=1)=>{
    let allProduct
    if(category){
        allProduct=await Product.findWithDeleted({type:category}).limit(10).skip(page*10-10)
    }
    else{
        allProduct=await Product.findWithDeleted({}).limit(10).skip(page*10-10)
    }
    allProduct=MultipleMongooseToObject(allProduct)
    let filterProduct=[]
    allProduct.forEach(item=>{
        if (item.name.toLowerCase().indexOf(key.toLowerCase())>=0){
            filterProduct.push(item)
        }
    })
    return filterProduct
}

const addKeyObject=(object,key,value)=>{
    object.forEach(item=>{
        item[key]=value
    })
}
module.exports={
    quantityPageProducts,
    findProduct,
    addKeyObject,
}