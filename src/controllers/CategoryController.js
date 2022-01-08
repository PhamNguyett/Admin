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
    const allCategory = await Category.find({}).populate('_id')
    let filterCategory=[]
    for(let i=(page-1)*10; i<allCategory.length&&page*10;i++){
        filterCategory.push(allCategory[i])
    }
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

const add=async(req,res)=>{

    console.log(req.body.tittle)
    console.log(req.file)
    const category=await Category.findOne({tittle:req.body.tittle})
    console.log(category)
    if(category){
        res.status(400).json({success:false})
    }
    else{
        const newCategory=new Category({
            tittle: req.body.tittle,
            imageUrl: '/uploads/'+req.file.filename
        })
        await newCategory.save()   
        res.status(200).json({success:true,newCategory})
    }
    
}



module.exports={
    index,
    add
}