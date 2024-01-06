const  app = require('./app')
const cloudinary = require('cloudinary').v2;

require('dotenv').config({path:"./config.env"})


// Mongodb DB connection
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, {
    // You can add more options as needed
})
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.error("MongoDB Connection Failed:", error);
    });


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_AIP_KEY,
    api_secret: process.env.CLOUDINARY_AIP_SECRET
});




const PORT = process.env.PORT
app.listen(PORT, function (){
    console.log(`App Run : ${PORT}`)
})

