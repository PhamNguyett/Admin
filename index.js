
const express = require('express')
const exphbs  = require('express-handlebars');
const moment =require('moment')
const path=require('path')
const app = express()
const passport=require('passport')
const morgan = require('morgan')

const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);


require('dotenv').config()

const route=require('./src/routes/index')

const db=require('./src/database/index') // connect database

app.use(express.static(path.join(__dirname,'/public'))) // public 



 app.use(morgan('dev'))
 
    
app.engine('hbs', exphbs({extname:'hbs',
    helpers:{
        upperCase(item) { return item.charAt(0).toUpperCase() + item.slice(1);},
        increase(a,i){ return a+i},
        quantityy(item){return item.reduce((total,i)=>{return total+i.quantity},0) },
        newLine(a){if(a) return a.replace(/\n/g, "<br />");},
        checkedBox(array,_this){ array.includes(_this)>=0?"true":"false" },
        momentFormatL (date){return moment(date).format('L'); },
        momentFormatAgo (date){return moment(date).startOf('day').fromNow();  },
        selectDefault(a,b){ if(a===b) {return 'selected'}},
        compareValue(a,b){if(a==b){return true}; return false}
    }
}));         //set view engine
app.set('view engine', 'hbs');          //set view engine
app.set('views',path.join(__dirname,'src/resources/views'))         //set view engine

app.use(express.urlencoded({ 
    extended:true
}))
app.use(express.json())


db.connect().then(()=>{
    const store = new MongoDBStore({
        uri: 'mongodb+srv://phat_trien_ud_web:thangvanguyet@cluster0.znme0.mongodb.net/localbrand_db_dev',
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