const DashboardRouter=require('./dashboard')
const UserRouter=require('./user_management')
const ProductPaginationRouter=require('./product_pagination')
const ProductListsRouter=require('./product_list')
const AddProductRouter=require('./add_product')
const EditProductRouter=require('./edit_product')
const AnalyticsRouter=require('./analytics')
const LoginRouter=require('./login')

function route(app){
    app.use('/dashboard',DashboardRouter)
    app.use('/user_management',UserRouter)
    app.use('/product_pagination',ProductPaginationRouter)
    app.use('/product_list',ProductListsRouter)
    app.use('/add_product',AddProductRouter)
    app.use('/edit_product',EditProductRouter)
    app.use('/analytics',AnalyticsRouter)
    app.use('/',LoginRouter)
}
module.exports=route