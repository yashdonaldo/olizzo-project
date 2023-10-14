const express = require('express')
const app = express()
const router = new express.Router();
const multer = require('multer')
const loginuser = require('../models/login')
const banner = require("../models/banner")
const ProductAdd = require('../models/productadd');
const contactuser = require('../models/contact')
const companyinfo = require("../models/conpanyinfo")
const offerdata = require("../models/offer")


const store = multer.diskStorage({
    destination: function(req, file, cb){
        if(file.mimetype === 'image/jpeg' 
        || file.mimetype === 'image/png'){
            cb(null,path.join(__dirname,'../public/image'));
        }
    },
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name);
    }
});
const fileFilter = (req,file,cb) => {
    if (file.fieldname === "pimage") {
        (file.mimetype === 'pimage/jpeg' 
         || file.mimetype === 'pimage/png')
        ? cb(null,true)
        : cb(null,false);
    }
}

const upload = multer({
    storage: store,
    fileFilter : fileFilter
}).fields([{ name: 'pimage', maxCount: 4 }]);


router.get('/', async (req, res) => {
    try {
        var search = ''
        if(req.query.search){
            search = req.query.search;
        }
        const offdata = await offerdata.find({})
        const banData = await banner.find({})
        const AllData = await ProductAdd.find({
            $or:[
                {product_name: {$regex:".*"+search+ ".*", $options: "i"}},
                {product_discription: {$regex:".*"+search+ ".*", $options: "i"}},
                {catagories: {$regex:".*"+search+ ".*", $options: "i"}},
                {model: {$regex:".*"+search+ ".*", $options: "i"}},
                {product_price: {$regex:".*"+search+ ".*", $options: "i"}},
                
            ]
        
        })
        if(AllData){
            res.status(200).render("index", {
                x : AllData,
                i : banData,
                j : offdata
            })
        }else{
            res.render("index")
        }
    } catch (error) {
        console.log(error.message)
    }
})
router.get('/about', (req, res) => {
    companyinfo.find({company_page : "Company Profile"}).then((x)=>{
        res.render('about', {x})
    })
})
router.get('/product', (req, res) => {
    res.render('product')
})
router.get('/order', (req, res) => {
    companyinfo.find({company_page : "Sample Process"}).then((x)=>{
        res.render('process', {x})
    })
})
router.get('/manufacture', (req, res) => {
    companyinfo.find({company_page : "Order Process"}).then((x)=>{
        res.render('manufaturing', {x})
    })
})
router.get('/register', (req, res) => {
    res.render('contact')
})

router.post('/register', async (req, res) => {
    try {
        let date = new Date().toLocaleDateString()
        console.log(date)
        const contactdetail1 = new contactuser({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            country: req.body.country,
            message: req.body.message,
            date: date

        })
        const rt = await contactdetail1.save();
        console.log(contactdetail1)
        res.status(201).render('thankyou')
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/edit/:id', (req, res) => {
    ProductAdd.findOne({ product_name : req.params.id }).then((x) => {
        res.render('productedit', { x })
    })
})
router.get('/model/:id', async (req, res)=>{
    const ModelData =  await ProductAdd.findOne({_id : req.params.id});
    if(ModelData){
        res.render("model", {x : ModelData})
    }else if(error){
        res.render("index", {message : "Something Went Wrong"})
    }
})

router.put('/edit/:id', upload, (req, res) => {
    if (req.file) {
        ProductAdd.updateOne({ product_name : req.params.id },
            {
                $set: {
                    product_name: req.body.pname,
                    product_img: req.file.filename,
                    product_price: req.body.price,
                    catagories: req.body.select,
                    product_discription: req.body.discription,
                }
            })
            .then((x) => {
                // const rt2 = await productdetail.save();
                // console.log(productdetail)
                res.status(201).redirect('/admin/addproduct9955')
            })
    } else {
        ProductAdd.updateOne({ product_name: req.params.id },
            {
                $set: {
                    product_name: req.body.pname,
                    // product_img: req.file.filename,
                    product_price: req.body.price,
                    catagories: req.body.select,
                    product_discription: req.body.discription,
                }
            })
            .then((x) => {
                // const rt2 = await productdetail.save();
                // console.log(productdetail)
                res.status(201).redirect('/admin/addproduct9955')
            })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        // const _id = req.params.id;
        let dl = await ProductAdd.findByIdAndDelete({ _id: req.params.id })
        req.flash("success", "Your Data Delete Sucessfully")
        res.status(200).redirect("/topdashboard")
    } catch (error) {
        res.status(404).send(error)
    }
})



router.get('*', (req, res) => {
    res.render('404')
})


module.exports = router;