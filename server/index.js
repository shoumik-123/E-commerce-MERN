const  app = require('./app')


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



const PORT = process.env.PORT || 8001
app.listen(PORT, function (){
    console.log(`App Run : ${PORT}`)
})

