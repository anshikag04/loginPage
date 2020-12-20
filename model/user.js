const mongoose = require('mongoose')

var userSchema = mongoose.Schema({
    userName:{
        type:String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    fullName : {
        type : String,
        required: true
    }
 })

var userModel = mongoose.model('user', userSchema)

module.exports = userModel

