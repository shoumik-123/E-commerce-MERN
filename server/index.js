const  app = require('./app')
const cloudinary = require('cloudinary')

require('dotenv').config({path:"./config.env"})


// Mongodb DB connection
const mongoose = require('mongoose');
mongoose.connect(process.env.DB_URI)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((err) => {
        console.error("Database Connection Failed", err);
    });

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_AIP_KEY,
    api_secret: process.env.CLOUDINARY_AIP_SECRET
});


const PORT = process.env.PORT || 8001
app.listen(PORT, function (){
    console.log(`App Run : ${PORT}`)
})

