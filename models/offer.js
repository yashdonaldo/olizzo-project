const mongoose = require("mongoose");
const offerschema = new mongoose.Schema({
    image_1 :{}
})
const offeradd = new mongoose.model("Offer Page", offerschema);

module.exports = offeradd;