const express = require('express');
const admin_route = express();

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

admin_route.get("/home",auth.isLogin ,adminController.loadDashboard)
admin_route.get("/logout", auth.isLogin ,adminController.logout);

admin_route.get("*", function(req, res){
    res.redirect("/admin")
})

module.exports = admin_route;

