const mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/advanced")

.then(()=>{
    console.log("Mongodb connected");
})

.catch((e)=>{
    console.log("Failed!");
    console.log(e)
})

const newSchema = mongoose.Schema({
    email:{
        type : String,
        required : true
    },
    password:{
        type: String,
        required : true
    }
})

const collection = mongoose.model("user",newSchema)

module.exports=collection