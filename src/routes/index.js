const DashboardRouter=require('./dashboard')
const UserRouter=require('./user_management')

const AnalyticsRouter=require('./analytics')
const LoginRouter=require('./login')
const ProductRouter=require('./product')

function route(app){
    app.use('/product',ProductRouter)
    app.use('/dashboard',DashboardRouter)
    app.use('/user-management',UserRouter)
    app.use('/analytics',AnalyticsRouter)
    app.use('/',LoginRouter)
}
module.exports=route