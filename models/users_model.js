const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    password:{
        type:String
    }
});

module.exports = mongoose.model('tbl_users',userSchema);