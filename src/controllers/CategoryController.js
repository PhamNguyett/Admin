const {Category}= require('../database')
const {MultipleMongooseToObject,MongooseToObject}=require('../ultil/mongoose')

const index=async(req,res)=>{
    try{
        let {page}=req.query
        if(!page){
            page=1
        }
        else{
            page=parseInt(page)
        }
    const allCategory = await Category.find({})
    let filterCategory=[]
    for(let i=(page-1)*10; i<allCategory.length&&page*10;i++){
        filterCategory.push(allCategory[i])
    }
    console.log(filterCategory)
    res.render('category',{
        allCategory:MultipleMongooseToObject(filterCategory),
        quantityPageCategory:(allCategory.length-1)/10+1,
        currentPage:page
    })
    }
    catch(e){
        console.log(e)
        res.render('404')
    }
}

module.exports={
    index
}