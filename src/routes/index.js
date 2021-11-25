const DashboardRouter=require('./dashboard')
const UserRouter=require('./user')

const AnalyticsRouter=require('./analytics')
const LoginRouter=require('./login')
const ProductRouter=require('./product')

function route(app){
    app.use('/product',ProductRouter)
    app.use('/',DashboardRouter)
    app.use('/user',UserRouter)
    app.use('/analytics',AnalyticsRouter)
    app.use('/login',LoginRouter)
}
module.exports=route