const express = require('express')
const path = require('path')
const TopRouter = new express.Router();
const multer = require('multer')
// const loginuser = require('../models/login')

const ProductAdd = require('../models/productadd');
const TopsCollection = require('../models/top')


const store = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "Public/img/photos")
    },
    filename: function(req, file, cb){
        cb(null,file.fieldname +  Date.now() + '_' + path.extname( file.originalname))
    }
})

const upload = multer({
    storage: store
})

TopRouter.get('/dashboard', (req, res)=>{
    ProductAdd.find({}).then((x)=>{
        res.render("dashboard", {x})
    })
})

TopRouter.get('/topA1-B2', (req, res)=>{
    TopsCollection.find({}).then((x)=>{
        res.render("top", {x})
        console.log(x)
    })
})
TopRouter.get('/top', (req, res)=>{
    res.render('topadd')
})
TopRouter.get('/topdashboard', (req, res)=>{
    TopsCollection.find({}).then((x)=>{
        res.render("topdashboard", {x})
    })
})
TopRouter.get('/body', (req, res)=>{
    res.render('body')
})
TopRouter.get('/Short-Dress', (req, res)=>{
    res.render('short-dress')
})
TopRouter.get('/Long-Dress', (req, res)=>{
    res.render('longdressadd')
})
TopRouter.get('/Jump-Suit', (req, res)=>{
    res.render('jumpsuitadd')
})
TopRouter.get('/Chord-Set', (req, res)=>{
    res.render('cordsetadd')
})
TopRouter.get('/Short-Skirt', (req, res)=>{
    res.render('short-skirt')
})
TopRouter.get('/Long-Skirt', (req, res)=>{
    res.render('long-skirt')
})
TopRouter.get('/Paint-Palazzo', (req, res)=>{
    res.render('paintpalazzo')
})

TopRouter.post('/topadd', upload.array("pimage",5), async (req, res) => {
    try {
        const Topdetail = await new TopsCollection({
            product_name: req.body.pname,
            product_img: req.files,
            product_price: req.body.price,
            product_discription: req.body.discription,
            product_model : req.body.pmodel

        })
        const rt2 = await Topdetail.save();
        console.log(Topdetail)
        res.status(201).redirect('/top')
    } catch (error) {
        res.status(404).send(error)
    }
})


module.exports = TopRouter;