const {Category,Product}= require('../database')
const {MultipleMongooseToObject,MongooseToObject}=require('../ultil/mongoose')

const index=async(req,res)=>{
    try{
    const allCategory = await Category.find({})
    const allProduct = await Product.find({})
    let num =[]
    for(let i=0; i<allCategory.length ; i++){
        num[i]=0;
    }

    for(let i=0; i<allCategory.length; i++){
        for (let j=0; j<allProduct.length ; j++){
            for(let k=0; k<(allProduct[j].categoryId).length; k++){
                if(`${allProduct[j].categoryId[k]}`==`${allCategory[i]._id}`)
                {   
                    num[i]++
                    console.log(allProduct[j].name)

                }
            }
        }
        console.log(allCategory[i].tittle)
        console.log(num[i])
    }
    res.render('category',{
        allCategory:MultipleMongooseToObject(allCategory),
        numOfCategory:JSON.stringify(num)
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