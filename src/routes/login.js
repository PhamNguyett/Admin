const express=require('express')
const route=express.Router()

const LoginController=require('../controllers/LoginController')
const passport = require('../middlewares/passport')

route.get('/',LoginController.login)
route.post('/',passport.authenticate('local',{ successRedirect: '/',failureRedirect: '/login?wrong' }))

route.get('/resetpassword',LoginController.reset)
module.exports=route