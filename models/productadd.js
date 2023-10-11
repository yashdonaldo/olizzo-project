const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_name: {
        type: String,
        require: true
    },
    product_discription: {
        type: String,
        require: true
    },
    product_price: {
        type: String,
        require: true
    },
    product_img: {
    },
    catagories:{
        type:String,
        required: true
    },
    model: {
        type: String,
        require: true
    }
})

const productAdd = new mongoose.model('productAdd', productSchema);

module.exports = productAdd;