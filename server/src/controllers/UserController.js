const UsersModel = require("../models/UsersModel");
const OTPModel = require("../models/OTPModel");
const jwt = require("jsonwebtoken");
const SendEmailUtility = require("../utility/SendEmailUtility");
const cloudinary = require('cloudinary')



//Registration
exports.Registration = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const existingUser = await UsersModel.findOne({ email }, { email: 1 });

        if (!existingUser) {

            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: "avatars",
                width: 150,
                crop: "scale"
            }).catch((uploadError) => {
                console.error("Error uploading to Cloudinary:", uploadError);
                throw uploadError;
            });


            const user = await UsersModel.create({
                name,
                email,
                password,
                avatar: {
                    public_id: myCloud.public_id,
                    url: myCloud.secure_url
                }
            });

            if (user) {
                res.status(200).json({ status: "success", data: user });
            } else {
                res.status(400).json({ status: "fail", data: "Registration Fail" });
            }
        } else {
            res.status(400).json({ status: "fail",email:existingUser, data: "Email already exists" });
        }
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ status: "error", data: "Internal Server Error" });
    }
};
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
            // console.log(user[0].role)
        }
        else{
            res.status(401).json({status:"Unauthorized"})
        }
    }
    catch(err){
        res.status(400).json({status : "fail" , data : err})
    }

}
// Update user profile
exports.UpdateProfile = async (req, res) => {
    try {
        let email = req.headers['email'];

        let reqBody = req.body;
        // Check if the avatar is included in the request body
        if (req.body.avatar) {
            // Upload the new avatar to Cloudinary
            const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
                folder: 'avatars',
                width: 150,
                crop: 'scale'
            }).catch((uploadError) => {
                console.error('Error uploading to Cloudinary:', uploadError);
                throw uploadError;
            });

            // Add the new avatar details to the request body
            reqBody.avatar = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };

            // Delete the old avatar from Cloudinary
            if (reqBody.oldAvatarPublicId) {
                await cloudinary.uploader.destroy(reqBody.oldAvatarPublicId);
            }
        }

        let user= await UsersModel.updateOne({ email: email }, { $set: reqBody })

        if(user){
            res.status(200).json({ status: "success", data: user });

        }
        else {
            res.status(400).json({ status: "fail", message: "Update fail" });

        }
    }
    catch(err) {
        res.status(400).json({ status: "fail", data: err });
    }
};
//get profile details
exports.ProfileDetails = async (req , res)=>{
    try {
        let email = req.headers['email'];

        let user =await UsersModel.aggregate([
            {$match:{email}},
            {$project:{_id:1,email:1,name:1,password:1,avatar:1,role:1,createdAt :1}}
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
//get all user details (Admin)
exports.GetAllUsers = async (req , res)=>{
    try {

        const totalUser = await UsersModel.countDocuments({role: "user"})
        const users =await UsersModel.find({role: "user"})
        if(users.length >0){
            res.status(200).json({status: "success",totalUser:totalUser , data: users})
        }
        else {
            res.status(400).json({status: "fail", data: "Users not found"})
        }
    }
    catch (e) {
        console.log(e)
    }
}
//get single user details (Admin)
exports.GetSingleUsers = async (req , res)=>{
    try {
        const id = req.params.id;
        const user =await UsersModel.findById(id)
        if(!user){
            res.status(400).json({status: "fail", data: "Users not found"})
        }
        else {
            res.status(200).json({status: "success", data: user})
        }
    }
    catch (e) {
        console.log(e)
    }
}
//Update user Role (Admin)
exports.UpdateRole = async (req, res) => {
    try {
        const id = req.params.id;
        const role = req.body.role;
        let user= await UsersModel.findByIdAndUpdate({ _id: id }, { $set: { role: role } },{new :true})

        if(user){
            res.status(200).json({ status: "success", data: user });
        }
        else {
            res.status(400).json({ status: "fail", message: "Update fail" });
        }
    }
    catch(err) {
        res.status(400).json({ status: "fail", data: err });
    }
};
//Delete user -- Admin
exports.DeleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await UsersModel.findById(id);

        if (!user) {
            return res.status(404).json({ status: "fail", message: "User not found" });
        }

        // Use deleteOne or remove, both work
        await UsersModel.deleteOne({ _id: id });

        res.status(200).json({ status: "success", message: "Delete success" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ status: "error", message: "Internal Server Error" });
    }
};




//For reset password
exports.RecoverVerifyEmail = async (req, res) => {
    let email = req.params.email;
    let OTPCode = Math.floor(100000 + Math.random() * 900000);

    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            // Email query
            const UserCount = await UsersModel.aggregate([
                {
                    $match: {
                        email: email,
                    },
                },
                {
                    $count: "total",
                },
            ]);

            if (UserCount[0].total > 0) {
                // OTP insert
                let CreateOTP = await OTPModel.create({ email: email, otp: OTPCode });

                // Send email
                let SendEmail = await SendEmailUtility(
                    email,
                    "Your verification code is = " + OTPCode,
                    "E-commerce(MERN) PIN verification."
                );

                res.status(200).json({ status: "success", data: SendEmail });
                break; // Exit the loop on success
            } else {
                res.status(200).json({ status: "fail", data: "No User Found." });
                break; // Exit the loop since no user is found
            }
        } catch (err) {
            console.error(err);

            if (retries < maxRetries - 1) {
                // Retry after a short delay
                console.log(`Retrying in 2 seconds (Retry ${retries + 1})`);
                await new Promise((resolve) => setTimeout(resolve, 2000));
            } else {
                // Reached max retries, send error response
                res.status(500).json({ status: "error", data: "Max retries reached" });
            }

            retries++;
        }
    }
};

exports.RecoverVerifyOTP= async (req,res)=>{
    let email = req.params.email;
    let OTPCode = req.params.otp;
    let status = 0;
    let statusUpdate = 1;


    try{

        let OTPCount = (await OTPModel.aggregate([
            {$match:{
                    email:email,
                    otp : OTPCode,
                    status : status
                }},
            {
                $count:"total"
            }
        ]))

        if(OTPCount[0].total > 0){
            let OTPUpdate = await OTPModel.updateOne(
                {email:email, otp : OTPCode, status : status},
                {email:email, otp : OTPCode, status : statusUpdate}
            )

            res.status(200).json({status:"success" , data: OTPUpdate});

        }


        else {
            res.status(201).json({status:"fail" , data: "Invalid OTP."})
        }

    }
    catch (err) {
        res.status(400).json({status:"Fail" , data: err})
    }
}
exports.RecoverResetPassword= async (req,res)=>{
    let email = req.body['email'];
    let OTPCode = req.body['otp'];
    let NewPassword = req.body['password'];
    let statusUpdate = 1;

    try{

        let OTPUsedCount = await OTPModel.aggregate([
            {$match:{
                    email:email,
                    otp : OTPCode,
                    status : statusUpdate
                }},
            {
                $count:"total"
            }
        ])

        if(OTPUsedCount[0].total > 0){
            let PasswordUpdate = await UsersModel.updateOne(
                {email:email},
                {password : NewPassword}
            )
            res.status(200).json({status:"success" , data: PasswordUpdate});
        }
        else {
            res.status(201).json({status:"fail" , data: "Invalid Password."})
        }
    }
    catch (err) {
        res.status(400).json({status:"fail" , data: err})
    }
}