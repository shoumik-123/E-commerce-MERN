
const express = require('express');
const router = require('./src/routes/api');
const app = new express();

const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

// Security Middleware
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const path = require("path");

// Security middleware Implement
app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(xss())
app.use(hpp());

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true })); // Specify extended: true

app.use(bodyParser.urlencoded({extended:true}))
app.use(fileUpload())

// Request rate limit
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 3000 });
app.use(limiter);



//Manage front end routing
app.use(express.static('client/dist'))
app.get("*", function (req, res) {
    // req.sendFile(path.resolve(__dirname,'client','build','index.html'))
    res.sendFile(path.resolve(__dirname,'../client/dist/index.html'))
})



// Routing Implement
app.use("/api/v1", router);


module.exports = app;
