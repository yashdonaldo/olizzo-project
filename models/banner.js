const mongoose = require("mongoose");
const bannerschema = new mongoose.Schema({
    image :{
    }
})
const BannerAdd = new mongoose.model("Banner", bannerschema);

module.exports = BannerAdd;