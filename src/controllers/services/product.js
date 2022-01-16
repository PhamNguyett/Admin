const Category = require('../../database/models/Category')
const Product=require('../../database/models/Product')


const findProductList=async(page,key,cateId)=>{
    let allProduct;
    let filterProduct=[]
    let result={
        currentPage:page,
        quantity:0,
        filterProduct:[]
    }
    if(cateId){
        const categoryItem=await Category.findOne({tittle:cateId})
        allProduct=await Product.findWithDeleted({categoryId:categoryItem._id})
    }
    else{
        allProduct=await Product.findWithDeleted({})
    }
    allProduct.forEach(item=>{
        if(item.name.toLowerCase().indexOf(key.toLowerCase())>=0|| 
        item.des.toLowerCase().indexOf(key.toLowerCase())>=0 ) {
            filterProduct.push(item) 
        }
    })
    result.quantity=filterProduct.length
    for(let i=(page-1)*10;i<filterProduct.length&&i<page*10;i++){
        result.filterProduct.push(filterProduct[i])
    }
    return result
}
const createInfoProduct=(data)=>{
    var categoryId=[]
    if(Array.isArray(data.category)){
        data.category.forEach((item)=>{
            categoryId.push(item)
        })
    }
    else{
        categoryId.push(data.category)
    }

    let info=[]
    if(Array.isArray(data.quantity)){
        for(let i=0;i<data.quantity.length;i++){
            info.push({
                color:data.color[i],
                size:data.size[i],
                quantity:data.quantity[i]
            })
        }
    }
    else{
        info.push({
            color:data.color,
            size:data.size,
            quantity:data.quantity
        })
    }
    return {
        categoryId,
        info
    }
}
module.exports={
    findProductList,
    createInfoProduct
}