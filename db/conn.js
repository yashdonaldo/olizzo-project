const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/olizzoUser",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

).then(()=>{
    console.log("Server connection sucessfully")
}).catch((err)=>{
    console.log("Server is Not running", err)
})