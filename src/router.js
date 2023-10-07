const express = require('express')
const app = express()
const router = new express.Router();
const multer = require('multer')
const loginuser = require('../models/login')

const ProductAdd = require('../models/productadd');


const store = multer.diskStorage({
    destination: "Public/img/photos",
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage: store
})
router.get('/', (req, res) => {
    ProductAdd.find({}).then((x) => {
        res.status(201).render('index', { x })

    })
})
router.get('/about', (req, res) => {
    res.render('about')
})
router.get('/product', (req, res) => {
    res.render('product')
})
router.get('/order', (req, res) => {
    res.render('process')
})
router.get('/manufacture', (req, res) => {
    res.render('manufaturing')
})
router.get('/register', (req, res) => {
    res.render('contact')
})
router.get('/product/1001-S2', (req, res) => {
    res.render('model_1001_S2')
})
router.get('/product/1001-S26', (req, res) => {
    res.render('1001-S26')
})
router.get('/product/1004-S7', (req, res) => {
    res.render('1004-S7')
})
router.get('/product/1004-SF1', (req, res) => {
    res.render('1004-SF1')
})
router.get('/product/1004-S15', (req, res) => {
    res.render('1004-S15')
})
router.get('/product/1004-S28', (req, res) => {
    res.render('1004-S28')
})
router.get('/product/1004-S23', (req, res) => {
    res.render('1004-S23')
})
router.get('/product/1005-S6', (req, res) => {
    res.render('1005-S6')
})
router.get('/product/1005-S5', (req, res) => {
    res.render('1005-S5')
})
// router.get('/admin', (req, res) => {
//     res.render('login')
// })

router.get('/addproduct9955', (req, res) => {
    res.render('productadd')
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
// router.post('/login/dashboard', async (req, res) => {
//     try {
//         const loginDetail = new loginuser({
//             usersname: req.body.username,
//             password: req.body.password,

//         })
//         const rt = await loginDetail.save();
//         console.log(loginDetail)
//         let username = loginDetail.usersname;
//         let password = loginDetail.password
//         console.log(loginDetail.usersname)
//         console.log(loginDetail.password)
//         if (username === "admin" && password === '12341234') {
//             ProductAdd.find({}).then((x) => {
//                 res.status(201).render('dashboard', { x })
//             })
//         } else {
//             console.log("password not matching")
//         }
//     } catch (error) {
//         res.status(404).send(error)
//     }
// })
router.post('/productedit', upload.single('pimage'), async (req, res) => {
    try {
        let num = new Date().getSeconds()
        const productdetail = new ProductAdd({
            product_name: req.body.pname,
            product_img: req.file.filename,
            product_price: req.body.price,
            catagories: req.body.select,
            product_discription: req.body.discription,
            un_id: num
        })
        const rt2 = await productdetail.save();
        console.log(productdetail)
        req.flash("success", "Your Data Added Sucessfully")
        res.status(201).redirect('/topdashboard')
    } catch (error) {
        res.status(404).send(error)
    }
})

router.get('/edit/:id', (req, res) => {
    ProductAdd.findOne({ product_name : req.params.id }).then((x) => {
        res.render('productedit', { x })
    })
})
router.put('/edit/:id', upload.single('pimage'), (req, res) => {
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