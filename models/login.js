const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    usersname: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
})

const LoginDetails = new mongoose.model('loginPassword', userSchema);

module.exports = LoginDetails;