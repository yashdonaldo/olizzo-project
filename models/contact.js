const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    phone: {
        type: Number,
        require: true
    },
    country: {
        type: String,
        require: true
    },
    message: {
        type: String,
        require: true
    },
    date: {
        type: String
    }
})

const Details = new mongoose.model('olizzoUser', userSchema);

module.exports = Details;