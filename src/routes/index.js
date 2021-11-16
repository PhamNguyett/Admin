const productRouter=require('./product')
const siteRouter=require('./site')
const checkoutRouter=require('./checkout')
const ContactRouter=require('./contact')
function route(app){
    app.use('/product',productRouter)
    app.use('/check-out',checkoutRouter)
    app.use('/contact',ContactRouter)
    app.use('/',siteRouter)

}
module.exports=route