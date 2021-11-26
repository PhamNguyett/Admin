
const express = require('express')
const exphbs  = require('express-handlebars');

const path=require('path')
const app = express()

const route=require('./src/routes/index')

const db=require('./src/database/index') // connect database

app.use(express.static(path.join(__dirname,'/src/public'))) // public 

 // ovewrite method

app.engine('hbs', exphbs({extname:'hbs',
    helpers:{
        upperCase(item) { return item.charAt(0).toUpperCase() + item.slice(1);},
        increase(a,i){return a+i},
        quantity(item){return item.reduce((total,i)=>{return total+i.quantity},0) },
        checkedBox(array,_this){ console.log(array); array.includes(_this)>0?"true":"false" },
        newLine(a){if(a) return a.replace(/\n/g, "<br />");}
    }
}));         //set view engine
app.set('view engine', 'hbs');          //set view engine
app.set('views',path.join(__dirname,'src/resources/views'))         //set view engine

app.use(express.urlencoded({ 
    extended:true
}))
app.use(express.json())

route(app)
db.connect()

app.listen(process.env.PORT||5000)