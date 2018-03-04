const express = require('express');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config();


mongoose.Promise = global.Promise;

mongoose.connect(`mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ds255308.mlab.com:55308/david-mlab`, err=>{
    if(err){
        console.log(err);
    }else{
        console.log("DB Connected")
    }
    
});

const postRoutes = require('./router/post')



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: false, extended: true }));

app.use("/posts", postRoutes);

module.exports = app;