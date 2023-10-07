const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    product_img : {
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
    product_model: {
        type: String,
        require : true
    }
})

const TopAdd = new mongoose.model('TopsCollection', productSchema);

module.exports = TopAdd;