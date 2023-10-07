const express = require('express');
const path = require('path');
const app = express();
let session = require('express-session');
let flash = require('connect-flash');
const ejs = require('ejs');
require('../db/conn');
let methodOverride = require('method-override');
const ProductAdd = require('../models/productadd');
const contactuser = require('../models/contact');
const router = require('./router');
const TopRouter = require('./topsrouter');
const port = process.env.PORT || 8000;





let st = path.join(__dirname, "../public");
let rpartials = path.join(__dirname, "../template/partial");
let rviews = path.join(__dirname, "../template/views");
// hbs.registerPartials(rpartials);

app.set('view engine', 'ejs');
app.set('views', rviews);

app.use(express.static(rviews))
app.use(express.static(st))
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
// Session middleware
app.use(session({
    secret : 'yash-coder',
    resave: true,
    saveUninitialized: true
}))
// flash middleware
app.use(flash())

app.use((req, res, next)=>{
    res.locals.success = req.flash("success"),
    res.locals.err = req.flash("err")
    next()
})


const adminRoute = require('./adminRoute');
app.use('/admin', adminRoute)

app.use(TopRouter)
app.use(router)



app.listen(port, ()=>{
    console.log(`The Server is Running at http://localhost:8000`)
})