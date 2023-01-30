const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const userRoute = require('./router/user_router');
const bikeTypeRoute = require('./router/bikeType.router');
const bikeRoute = require('./router/bike_router');
const dotenv = require('dotenv');
dotenv.config();


const PORT = process.env.PORT || 9000

const app = express();
app.use(express.json());
app.use(bodyparser.json());

mongoose.set('strictQuery', true);
const dburl = 'mongodb+srv://Ushashree:usha@cluster0.8pw2ran.mongodb.net/BikeDB?retryWrites=true&w=majority';

mongoose.connect(dburl, { 
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    .then(() => console.log('Database is connected...'))
    .catch(err => console.log(err));

app.use('/users',userRoute);
app.use('/bikeTypes',bikeTypeRoute);
app.use('/bikes',bikeRoute);
app.use('/uploads',express.static('uploads'));

app.listen(PORT,()=>{
    console.log(`Server is running... on Port ${PORT}`);
})