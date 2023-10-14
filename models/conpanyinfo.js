const mongoose = require('mongoose')

const companyschema = new mongoose.Schema({
    Company_info: {
    },
    image: {},
    company_page: {
        type: String,
        require: true
    }
})
const Company_info = new mongoose.model('Company_info', companyschema);

module.exports = Company_info;