const mongoose = require('mongoose')

const userSchema1 = new mongoose.Schema({
    username : {type:String, required:true, unique:true},
    email : {type:String, required:true, unique:true},
    password : {type:String, required:true}
}, {timeseries : true});

module.exports = mongoose.model('User_ChatGPT', userSchema1);