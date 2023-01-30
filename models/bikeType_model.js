const mongoose = require('mongoose');

const bikeTypeSchema = new mongoose.Schema({
    bikeType: {
        type: String
    },
    createdBy:
    {    
        type: mongoose.Schema.ObjectId,
        ref: 'tbl_users',    
    }
})

module.exports = mongoose.model('tbl_bikeType',bikeTypeSchema);