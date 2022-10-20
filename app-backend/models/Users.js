const mongoose = require("mongoose");

const userDataSchema = new mongoose.Schema({
    username : {type : String},
    password : {type : String},
    user_email : {type : String, unique : true}
})

module.exports = mongoose.model("users",userDataSchema);