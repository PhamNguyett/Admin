
const express = require('express')
const exphbs  = require('express-handlebars');

const path=require('path')
const app = express()
const passport=require('passport')
const morgan = require('morgan')

const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);


require('dotenv').config()

const route=require('./src/routes/index')
const helperHandleBar=require('./src/ultil/helperHanldeBar')
const db=require('./src/database/index') // connect database

app.use(express.static(path.join(__dirname,'/public'))) // public 



app.use(morgan('dev'))

app.engine('hbs', exphbs({extname:'hbs',
    helpers:helperHandleBar // handlebar ../src/ultil
}));         //set view engine


app.set('view engine', 'hbs');          //set view engine
app.set('views',path.join(__dirname,'src/resources/views'))         //set view engine

app.use(express.urlencoded({ 
    extended:true
}))
app.use(express.json())


db.connect().then(()=>{
    const store = new MongoDBStore({
        uri: process.env.DB_URL,
        collection: 'mySessions'
    });
    app.use(session({
        secret: 'secret key ',
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
        },
        store: store,
        resave: true,
        saveUninitialized: true
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use((req,res,next)=>{
        if(!req.isAuthenticated()){
            if(req.path!=='/login'){
                res.redirect('/login')
                return
            }
        }
        else{
            res.locals.user=req.user 
        }
        next()
    })
    route(app)
})

app.listen(process.env.PORT||5000)