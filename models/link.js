const mongoose = require('mongoose')

const linkschema = new mongoose.Schema({
    Whatsapp_Link : {
        type : String,
    },
    Instagram_Link : {
        type : String,
    },
    Facebook_Link : {
        type : String,
    },
    Youtube_Link : {
        type : String,
    },
    Email : {
        type : String,
    },
    Number : {
        type : Number,
    },
})
const link = new mongoose.model('Socail Link', linkschema);

module.exports = link;