const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    un_id : {
        type: Number
    },
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
    product_img:{
        type: String,
        require: true
    },
    catagories:{
        type:String,
        required: true
    }
})

const productAdd = new mongoose.model('productAdd', productSchema);

module.exports = productAdd;