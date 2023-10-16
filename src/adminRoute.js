const express = require('express');
const admin_route = express();
const path = require('path')
const multer = require('multer')
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

const session = require('express-session');
admin_route.use(session({
    secret: "yash-coder",
    resave: true,
    saveUninitialized: true
}))
const auth = require('../middleware/adminauth')

const bodyparser = require('body-parser');
admin_route.use(bodyparser.json());
admin_route.use(bodyparser.urlencoded({extended:true}));


admin_route.set("view engine", "ejs");
admin_route.set("views", "./template/views/admin");

const adminController = require('../constrollers/adminController')

admin_route.get("/", auth.isLogout ,adminController.loadlogin);
admin_route.post("/", adminController.verifyLogin)

admin_route.get("/home", auth.isLogin ,adminController.loadDashboard)
admin_route.get("/logout", auth.isLogin ,adminController.logout);

admin_route.get("/new-product", auth.isLogin, adminController.newProduct);
admin_route.post("/new-product",upload.array("pimage",8), adminController.addProduct);

admin_route.get("/edit-product", auth.isLogin, adminController.editProduct)
admin_route.post("/edit-product",upload.array("pimage",8), adminController.updateProduct)

admin_route.get("/delete-product", auth.isLogin, adminController.deleteProduct);

admin_route.get("/query", auth.isLogin ,adminController.query)

admin_route.get("/export-product", auth.isLogin, adminController.exportData)
admin_route.get("/export-pdf", auth.isLogin, adminController.exportpdf)

admin_route.get("/banner", auth.isLogin, adminController.banner)
admin_route.get("/upload-banner", auth.isLogin, adminController.uploadbanner)
admin_route.post("/upload-banner",upload.single("image"), adminController.bannerAdd)
admin_route.get("/banner-delete", auth.isLogin, adminController.bannerdelete)


admin_route.get("/company-info", auth.isLogin, adminController.companyinfo)
admin_route.post("/company-info",upload.array("pimage"), adminController.companyupload)

admin_route.get("/offer", auth.isLogin, adminController.offer);
admin_route.get("/offer-update", auth.isLogin, adminController.offerupdate);
admin_route.post("/offer-update", upload.single("image"), adminController.offeradd);
admin_route.get("/offer-delete", auth.isLogin, adminController.offerdelete)

admin_route.get("/link", auth.isLogin, adminController.link)
admin_route.post("/link", adminController.linkadd)

admin_route.get("/link-edit", auth.isLogin, adminController.linkeditpage)
admin_route.post("/link-edit", adminController.linkUpdate)


admin_route.get("*", function(req, res){
    res.redirect("/admin")
})

module.exports = admin_route;

