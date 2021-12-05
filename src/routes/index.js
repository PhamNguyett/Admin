const DashboardRouter=require('./dashboard')
const UserRouter=require('./user')
const AnalyticsRouter=require('./analytics')
const LoginRouter=require('./login')
const AdminRouter=require('./admin')
const ProductRouter=require('./product')
function route(app){
    app.use('/product',ProductRouter)
    app.use('/dashboard',DashboardRouter)
    app.use('/user',UserRouter)
    app.use('/analytics',AnalyticsRouter)
    app.use('/admin',AdminRouter)
    app.use('/login',LoginRouter)
    app.get('/logout', function(req, res){
        req.logout();
        res.redirect('/login');
      });
}
module.exports=route