const { json } = require('body-parser');
const bikeModel = require('../models/bike_model');
var ObjectId = require('mongodb').ObjectId;

//Add Bike
const addBike = (req,res)=>{
    let newbike = new bikeModel({
        bikeTypeId: req.body.bikeTypeId,
        bikeName: req.body.bikeName,
        price: req.body.price,
        color: req.body.color,
        userId: req.body.userId,
    })
     if(req.file){                                                            
        newbike.photo = req.file.path;           
     }

    newbike.save().then((response)=>{
        res.json({
            message: 'Bike Added Successfully'
        })
    }).catch((err)=>{
            res.json({
                error: `Error Occured While adding Bike...${err}`
            });
    })
}

//Get All Bikes
const getAllBikes = (req,res) => {
    bikeModel.find().populate({path:'bikeTypeId', select:['_id', 'bikeType']})
    .populate({path:'userId', select:['_id', 'name']})
        .then((response)=>{
            res.json({
                response,
            })
        }).catch((error)=>{
            res.json({
                message: `An error occur while getting all bikes...${error}`
            })
        });
}

//Update Bike
const updateBike = (req,res)=>{
    let {id} = req.params;

    let updatedBike = {
        bikeTypeId: req.body.bikeTypeId,
        bikeName: req.body.bikeName,
        price: req.body.price,
        color: req.body.color,
        userId: req.body.userId,
    }
    bikeModel.findByIdAndUpdate(id,{$set: updatedBike})
        .then(()=> {
            res.json({
                message: 'Updated successfully...'
            })
        }).catch((error)=>{
            res.json({
                message:`Error occur while updating...${error}`
            })
        });
}

//Delete Bikes

const deleteBike = (req,res)=>{
    let {id} = req.params;
    bikeModel.findByIdAndDelete(id).then(()=>{
        res.json({
            message: `${id} Id Bike deleted...`
        })
    }).catch((error)=>{
        res.json({
            message: `Error occur while deleting bike...${error}`
        })
    });
}

//Get Bikes by Bike Type
const getBikeByType = async(req,res)=>{
    let id = req.params.id;
    // bikeModel.find({bikeTypeId:{_id:id}}).then((response)=>{
    //     res.json({
    //         response
    //     })
    // }).catch((error)=>{
    //     res.json({
    //         message: `Error occur while Finding Bike Type...${error}`
    //     })
    // });
 
    bikeModel.aggregate(
        [
            {
              '$lookup': {
                'from': 'tbl_biketypes', 
                'localField': 'bikeTypeId', 
                'foreignField': '_id', 
                'as': 'tbl_biketypes'
              }
            }, {
              '$unwind': '$tbl_biketypes'
            }, {
              '$match': {
                'tbl_biketypes._id': new ObjectId(id)
              }
            }
          ]
    ).then((response)=>{
        res.json({
            response
        })
    }).catch((error)=>{
        res.json({
            message: `Error occur while Finding Bike by Bike Type...${error}`
        })
    });
 }

 //Get Bikes by User
const getAllBilkesByUser = async(req,res)=>{
    let id = req.params.id;

    bikeModel.aggregate(
        [
            {
              '$lookup': {
                'from': 'tbl_users', 
                'localField': 'userId', 
                'foreignField': '_id', 
                'as': 'tbl_users'
              }
            }, {
              '$unwind': '$tbl_users'
            }, {
              '$match': {
                'tbl_users._id': new ObjectId(id)
              }
            }
          ]
    ).then((response)=>{
        res.json({
            response
        })
    }).catch((error)=>{
        res.json({
            message: `Error occur while Finding Bike by User...${error}`
        })
    });
}

// //Added Like
const addLike = async(req,res) =>{

    const bike = await bikeModel.find({ _id: req.params.bikeid,"likes": req.body.userid})
    let {bikeid} = req.params;
    if(bike.length>0){
        try{
                const record=await
                 bikeModel.findByIdAndUpdate(bikeid ,{ $pull: { "likes" : req.body.userid } })
                 res.json({
                    message: 'Removed successfully...'                   
                })               
            }catch(error){
                res.status(400).json({
                    message:`Error occur while liking...${error.message}`
                })
            }
    }
    else{
        const record=await
         bikeModel.updateOne(
            { _id: bikeid },
            { $push: { likes: req.body.userid } })
         res.json({
            message: 'Liked successfully...'})
            
    }

}


//Comment on Bike
const addComment = (req,res) =>{
    let {bikeid} = req.params;
    // let uid = req.body.userId;

       bikeModel.updateOne(
            { _id: bikeid },
            { $push: { comment: req.body.comment} }
         ).then(()=> {
            res.json({
                message: 'comment added successfully...'
            })
        }).catch((error)=>{
            res.json({
                message:`Error occur while commenting...${error}`
            })
        });
}

module.exports = {
    addBike,
    getAllBikes,
    updateBike,
    deleteBike,
    getBikeByType,
    getAllBilkesByUser,
    addLike,
    addComment,

};