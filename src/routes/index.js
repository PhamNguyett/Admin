const UserRouter=require('./user_management')
const AllProductRouter=require('./all_products')
const AddProductRouter=require('./add_product')
const EditProductRouter=require('./edit_product')
const AnalyticsRouter=require('./analytics')
const siteRouter=require('./site')

function route(app){
    app.use('/user_management',UserRouter)
    app.use('/all_products',AllProductRouter)
    app.use('/add_product',AddProductRouter)
    app.use('/edit_product',EditProductRouter)
    app.use('/analytics',AnalyticsRouter)
    app.use('/',siteRouter)
}
module.exports=route