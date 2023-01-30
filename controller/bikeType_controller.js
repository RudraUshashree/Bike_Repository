const bikeTypeModel = require('../models/bikeType_model');

//Add BikeType
const addBikeType = (req,res,next)=>{
    let newbikeType = new bikeTypeModel({
        bikeType: req.body.bikeType,
        createdBy: req.body.createdBy
    });

    newbikeType.save().then((response)=>{
        res.json({
            message: 'BikeType Added Successfully'
        })
    }).catch((err)=>{
            res.json({
                error: `Error Occured While adding BikeType...${err}`
            });
    })
}

//Get All BikeTypes
const getAllBikeTypes = (req,res) => {
    bikeTypeModel.find().select({__v:0}).populate({path:'createdBy', select:['_id', 'name']})
        .then((response)=>{
            res.json({
                response,
            })
        }).catch((error)=>{
            res.json({
                message: `An error occur while getting all biketypes...${error}`
            })
        });
}

module.exports={
    addBikeType,
    getAllBikeTypes,
}