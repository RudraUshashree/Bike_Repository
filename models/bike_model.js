const mongoose = require('mongoose');

const bikeSchema = new mongoose.Schema({
    bikeTypeId:{
        type: mongoose.Schema.ObjectId,
        ref: 'tbl_bikeType',
    },
    bikeName:{
        type: String,
    },
    price:{
        type: Number,
    },
    color: {
        type: String,
    },
    userId: {      
        type: mongoose.Schema.ObjectId,
        ref: 'tbl_users',
    }, 
    likes: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'tbl_users',
            }
        ],
    comment:[
            {
                type: mongoose.Schema.ObjectId,
                ref: 'tbl_users',
            },
            {
                type: String
            }
        ],  
    photo:{
        type:String
    }, 
    regDate: {
        type: Date,
		default: Date.now
    }
});

module.exports = mongoose.model('tbl_bike',bikeSchema);