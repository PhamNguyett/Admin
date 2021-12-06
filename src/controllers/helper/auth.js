const passport=require('passport')
const Admin=require('../../database/models/Admin')
const {MongooseToObject}=require('../../ultil/mongoose')
const argon2 =require('argon2')
const LocalStrategy=require('passport-local')


passport.use(new LocalStrategy( 
    async function (username, password, done) {
        try{
            const user=await Admin.findOne({ username: username })
            if (!user) { return done(null, false,{message:'Username does not exist ! '}); }
            let isSuccess=await argon2.verify(user.password,password)
            if(!isSuccess) { return done(null, false,{message:'Password is wrong ! '});}
            return done(null, {name:user.name,avatarUrl:user.avatarUrl,_id:user._id,success:true});
        }catch(e){
            return done(e);
        }
}));
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
passport.deserializeUser( async function(id, done) {
    const user=await Admin.findById(id)
    if(user){
        return done(null,MongooseToObject(user))
    }
    return done(null,false)
});

module.exports=passport