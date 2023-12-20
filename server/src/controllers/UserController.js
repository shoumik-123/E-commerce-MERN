const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");




//Registration
exports.Registration = async (req, res)=>{
    try {
        let reqBody = req.body;

        let user = await UsersModel.create(reqBody)

        if(user){
            res.status(200).json({status: "Success", data: user})
        }
        else {
            res.status(400).json({status: "Fail", data: "Registration Fail"})
        }
    }
    catch (e){
        console.log(e)
    }

}
//login
exports.UserLogin = async (req,res)=>{
    try {
        let reqBody= req.body;
        let user =await UsersModel.aggregate([
                {$match:reqBody },
                {$project:{_id:0,email:1,role:1}}
            ]
        )
        // console.log("user",user)
        if(user.length > 0){
            let payload =  {exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), data: user[0]}
            let token = jwt.sign( payload , process.env.SECRET_KEY);

            res.status(200).json({status:"success" , token: token ,  data:user})
            console.log(user[0].role)
        }
        else{
            res.status(401).json({status:"Unauthorized"})
        }
    }
    catch(err){
        res.status(400).json({status : "fail" , data : err})
    }

}
exports.UpdateProfile = (req, res) => {
    let email = req.headers['email'];
    let reqBody = req.body;

    UsersModel.updateOne({ Email: email }, { $set: reqBody })
        .then((result) => {
            res.status(200).json({ status: "Success", data: result });
        })
        .catch((err) => {
            res.status(400).json({ status: "Fail", data: err });
        });
};
//get profile details
exports.ProfileDetails = async (req , res)=>{
    try {
        let email = req.headers['email'];

        let user =await UsersModel.aggregate([
            {$match:{email}},
            {$project:{_id:1,email:1,name:1,password:1,avatar:1}}
        ])
        if(user.length >0){
            res.status(200).json({status: "success", data: user})
        }
        else {
            res.status(400).json({status: "fail", data: "User not found"})
        }
    }
    catch (e) {
        console.log(e)
    }
}




//For reset password
exports.RecoverVerifyEmail= async (req,res)=>{
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() *  900000)

    try{
        //Email query
        let UserCount = (await UsersModel.aggregate([
            {$match:{
                    Email:email
                }},
            {
                $count:"total"
            }
        ]))
        if(UserCount[0].total > 0){

            //OTP insert
            let CreateOTP = await OTPModel.create({Email:email , Otp : OTPCode})

            //Send email
            let SendEmail = await SendEmailUtility(email , "Your PIN code is =  " + OTPCode , "E-commerce PIN verification.")

            res.status(200).json({status:"Success" , data: SendEmail})
        }
        else {
            res.status(200).json({status:"Fail" , data: "No User Found."})
        }
    }
    catch (err) {
        res.status(400).json({status:"Fail" , data: err})
    }
}
exports.RecoverVerifyOTP= async (req,res)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status = 0;
    let statusUpdate = 1;


    try{

        let OTPCount = (await OTPModel.aggregate([
            {$match:{
                    Email:email,
                    Otp : OTPCode,
                    Status : status
                }},
            {
                $count:"total"
            }
        ]))

        if(OTPCount[0].total > 0){
            let OTPUpdate = await OTPModel.updateOne(
                {Email:email, Otp : OTPCode, Status : status},
                {Email:email, Otp : OTPCode, Status : statusUpdate}
            )

            res.status(200).json({status:"Success" , data: OTPUpdate});

        }


        else {
            res.status(201).json({status:"Fail" , data: "Invalid OTP."})
        }

    }
    catch (err) {
        res.status(400).json({status:"Fail" , data: err})
    }
}
exports.RecoverResetPassword= async (req,res)=>{
    let email = req.body['Email'];
    let OTPCode = req.body['Otp'];
    let NewPassword = req.body['Password'];
    let statusUpdate = 1;

    try{

        let OTPUsedCount = await OTPModel.aggregate([
            {$match:{
                    Email:email,
                    Otp : OTPCode,
                    Status : statusUpdate
                }},
            {
                $count:"total"
            }
        ])

        if(OTPUsedCount[0].total > 0){
            let PasswordUpdate = await UsersModel.updateOne(
                {Email:email},
                {Password : NewPassword}
            )
            res.status(200).json({status:"Success" , data: PasswordUpdate});
        }
        else {
            res.status(201).json({status:"Fail" , data: "Invalid Password."})
        }
    }
    catch (err) {
        res.status(400).json({status:"Fail" , data: err})
    }
}