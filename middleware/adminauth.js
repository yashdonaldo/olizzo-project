const isLogin = async(req, res, next)=>{
    try {
        if(req.session.user_id){}
        else{
            res.status(200).redirect("/admin")
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}

const isLogout = async(req, res, next)=>{
    try {
        if (req.session.user_id) {
            res.status(200).redirect("/admin/home")
        }
        next();
    } catch (error) {
        console.log(error.message)
    }
}


module.exports = {
    isLogin,
    isLogout,
}