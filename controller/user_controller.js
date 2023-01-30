const userModel = require('../models/users_model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv');

const userRegister = (req,res,next)=>{
    bcrypt.hash(req.body.password,10,function(err,hassedpass){
        if(err){
            res.json({
                error: err
            })
        }

    let newUser = new userModel({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hassedpass
    });

    newUser.save().then((response)=>{
        res.json({
            message: 'User Registered Successfully'
        })
    }).catch((err)=>{
            res.json({
                error: `Error Occured While User Registered...${err}`
            });
    })
  })
};

const login = (req,res,next)=>{
    var username = req.body.username;
    var password = req.body.password;

    userModel.findOne({$or: [{email:username},{phone:username}]})
        .then((user)=>{
            if(user){
                bcrypt.compare(password,user.password,function(err,result){
                    if(err){
                        res.json({
                            error: err
                        })
                    }
                    if(result){
                        let token = jwt.sign({name: user.name},process.env.ACCESS_TOKEN_SECRET,{expiresIn: process.env.ACCESS_TOKEN_EXPRIE_TIME});
                        res.json({
                            message: 'Login Successfully',
                            token: token,
                        })
                    }else{
                        res.json({
                            message: 'Password does not match...'
                        })
                    }
                })
            }else{
                res.json({
                    message: 'User not Exists...'
                })
            }
        })
}



module.exports = {
    userRegister,
    login,
};