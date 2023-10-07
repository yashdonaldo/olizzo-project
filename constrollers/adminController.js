const User = require("../models/login");
const ProductData = require("../models/productadd")
const bcrypt = require('bcrypt')

const loadlogin = async(req, res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error.message)       
    }
}

const verifyLogin = async(req, res)=>{
    try {
        const username = req.body.username;
        const password = req.body.password;
        const UserData = await User.findOne({usersname : username});
        if(UserData ){
            if(UserData.password == password){
                req.session.user_id = UserData._id
                res.redirect("/admin/home")
            }else{
                res.render("login", {message: "Username or Password is incorrect"})
            }
        }else{
            res.render("login", {message: "Username or Password is incorrect"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadDashboard = async(req, res)=>{
    try {
        const data = await ProductData.find({catagories : "Top"})
        res.status(200).render("home", {users: data})
    } catch (error) {
        console.log(error.message)      
    }
}

const logout = async(req, res)=>{
    try {
        req.session.destroy();
        res.status(200).redirect("/admin");
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadlogin, verifyLogin, loadDashboard , logout
}